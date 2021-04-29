// lista de endpoints pra usar e a estrutura deles pra chegar nos resultados interessantes

const yargs = require('yargs').argv;

const fetch = require('node-fetch');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'polvopaul'
});

connection.connect();

const idPartida = yargs.idPartida; // a partir desse id, podemos consultar na api as partidas anteriories e ir parseando elas
const idTime = yargs.idTime;
const limite = yargs.limite;

const stats_match_get = (idPartida) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/en/Europe:London/gismo/stats_match_get/${idPartida}`).then(res => res.json()).then(res => resolve(res.doc[0].data)).catch(err => reject(err)))
const stats_match_lineup = (idPartida) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/en/Europe:Berlin/gismo/stats_match_lineup/${idPartida}`).then(res => res.json()).then(res => resolve(res.doc[0].data)).catch(err => reject(err)))
const match_squads = (idPartida) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/en/Europe:London/gismo/match_squads/${idPartida}`).then(res => res.json()).then(res => resolve(res.doc[0].data)).catch(err => reject(err)))

let sucessos = []
let erros = []

const novoSucesso = (idPartida,source,msg) => {
    erros.push(idPartida)
} 
const novoErro = (idPartida,source,msg) => {
    erros.push({idPartida:idPartida, source:source, msg:msg})
} 

let IDultimaPartidaInserida = null;
let insert_stats_match_get;

let time_home;
let time_home_id;
let time_home_nome;

let time_away;
let time_away_id;
let time_away_nome;

let matchStats_;

const parseHistoricoTime = (idPartida,idTime,iteracoes,limite) => {
    console.log(iteracoes,' de ',limite, `${idPartida},${idTime}`)
    stats_match_get(idPartida).then(matchStats => {
        matchStats_ = matchStats;
        console.log('stats_match_get',true)
        // console.group('stats_match_get')
        //     console.log('matchweather',matchStats.matchweather)
    
        //     console.group('home')
        time_home = matchStats.teams.home
        time_home_id = time_home.uid;
        time_home_nome = time_home.name;
    
        //         console.log(time_home_nome)
        //         console.log('nextMatch',matchStats.teamhistory[time_home_id].next)
        //         console.log('previousMatch',matchStats.teamhistory[time_home_id].previous)
        //     console.groupEnd()
            
        //     console.group('home')
        time_away = matchStats.teams.away
        time_away_id = time_away.uid;
        time_away_nome = time_away.name;
    
        //         console.log(time_away_nome)
        //         console.log('nextMatch', matchStats.teamhistory[time_away_id].next)
        //         console.log('previousMatch', matchStats.teamhistory[time_away_id].previous)
        //     console.groupEnd()
        // console.groupEnd()

        
        insert_stats_match_get = `INSERT INTO partida (esporte,
                campeonato,
                bet365,
                home_id,
                away_id,
                round,
                intervalo_home,
                intervalo_away,
                result_home,
                result_away,
                period,
                vencedor,
                week,
                comment,
                stadiumid)
            VALUES (1,
                (SELECT id FROM campeonatos WHERE bet365 = ${matchStats.tournament._id}),
                ${idPartida},
                (SELECT id FROM clubes WHERE bet365 = ${time_home_id}),
                (SELECT id FROM clubes WHERE bet365 = ${time_away_id}),
                ${matchStats.round},
                ${matchStats.periods.p1.home},
                ${matchStats.periods.p1.away},
                ${matchStats.periods.ft.home},
                ${matchStats.periods.ft.away},
                "${matchStats.result.period}",
                "${matchStats.result.winner}",
                ${matchStats.week},
                '${matchStats.comment}',
                ${matchStats.stadiumid})
        `;
    })
    .then(() => {
        stats_match_lineup(idPartida)
            .then(lineupStats => {
                parseLineupInfos = (jogador) => ({
                    partida: IDultimaPartidaInserida,
                    jogador_clube: `(SELECT jogadores_clube.id FROM jogadores_clube INNER JOIN jogadores ON jogadores.id = jogadores_clube.jogador_id WHERE jogadores.bet365 = ${jogador.player._id})`,
                    bet365: jogador.player._id,
                    local: jogador.team == "home",
                    titular: !jogador.substitute, // bet365 traz o substitute como true ou false, entao se for false o cara começou jogando
                    shirtnumber: jogador.shirtnumber,
                    minutosjogados: jogador.minutesplayed
                })

                connection.query(insert_stats_match_get, function (error, results, fields) {
                    if (error) throw error;
                    // console.log('insert stats_match_get:', results);
                    IDultimaPartidaInserida = results.insertId;

                    let todosJogadores = []
                    todosJogadores.push(...lineupStats.players.home.map(parseLineupInfos))
                    todosJogadores.push(...lineupStats.substitutes.home.map(parseLineupInfos))
                    todosJogadores.push(...lineupStats.players.away.map(parseLineupInfos))
                    todosJogadores.push(...lineupStats.substitutes.away.map(parseLineupInfos))

                    let camposDaTabela = Object.keys(todosJogadores[0]);
                    let valoresJogadores = todosJogadores.map(jogador => `(${Object.values(jogador).join(',')})`).join(',')
                    let insereJogadoresRelacionados = `INSERT INTO jogadores_partida (${camposDaTabela}) VALUES ${valoresJogadores}`
                    connection.query(insereJogadoresRelacionados, function (error, results, fields) {
                        if (error) throw error;
                        // console.log('insert stats_match_lineup:', results);
                    });
                });

            })
            .then(() => {
                // aqui ainda nao tem nada util
                // match_squads(idPartida).then(matchSquadsDetails => {
                //     console.log(matchSquadsDetails.events)
                // })
            })
            .catch(error => {
                novoErro(idPartida,'stats_match_lineup',error)
            })
    })
    .catch(error => {
        console.log('stats_match_get',false,error)
        novoErro(idPartida,'stats_match_get',error)
    })
    .finally(() => {
        let proximaIteracao = iteracoes+1;
        if(proximaIteracao < limite){
            let idProximaPartida;
            if(idTime == time_home_id) {
                idProximaPartida = matchStats_.teamhistory[time_home_id].previous
            } else {
                idProximaPartida = matchStats_.teamhistory[time_away_id].previous
            }
            parseHistoricoTime(idProximaPartida,idTime,iteracoes+1,limite)
        }        
    })
}

parseHistoricoTime(idPartida,idTime,0,limite)

// match_squads.doc[0].data
// match_squads.doc[0].data.events
// match_squads.doc[0].data.[home/away].startinglineup
// match_squads.doc[0].data.[home/away].startinglineup.formation
// match_squads.doc[0].data.[home/away].startinglineup.players
// match_squads.doc[0].data.[home/away].startinglineup.players.map(p => p.playerid)
// match_squads.doc[0].data.[home/away].substitutes
// match_squads.doc[0].data.[home/away].substitutions // combinação de .startinglineup e .substitutes

// match_squads.doc[0].data.match
// match_squads.doc[0].data.match.cards
// match_squads.doc[0].data.match.result