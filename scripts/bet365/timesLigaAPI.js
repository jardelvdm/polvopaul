const models = require('./models'),
      API = require('./api'),
      db = require('./db');

db.connect().then(() => {
    db.campeonato(905).then(campeonatos => console.log(campeonatos))
})

// let idTemporada = 77179;

// API.detalhesLiga(idTemporada).then(dadosLiga => {

//     // API.timesLiga(idTemporada)
//     // console.log('dadosLiga',dadosLiga)

//     // const statsTimesLiga = Object.values(dadosLiga.stats);

//     // const timesLiga = statsTimesLiga.map(time => time.team);

          
// })

// const erros = [];

// // estatisticas de overunder da liga, mas traz a lista de times, etc

// const stats_match_lineup = (idPartida) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/en/Europe:Berlin/gismo/stats_match_lineup/${idPartida}`).then(res => res.json()).then(res => resolve(res.doc[0].data)).catch(err => reject(err)))

// const modelLineupInfos = (jogador,partida) => ({
//     partida: `(SELECT id FROM partidas WHERE bet365 = ${partida.bet365})`,
//     jogador_clube: `(SELECT jogadores_clube.id FROM jogadores_clube INNER JOIN jogadores ON jogadores.id = jogadores_clube.jogador_id WHERE jogadores.bet365 = ${jogador.player._id})`,
//     bet365: jogador.player._id,
//     local: jogador.team == "home",
//     titular: !jogador.substitute, // bet365 traz o substitute como true ou false, entao se for false o cara começou jogando
//     shirtnumber: jogador.shirtnumber,
//     minutosjogados: jogador.minutesplayed
// })

// const todosJogadoresTodasPartidas = [];
// connection.query("SELECT * FROM `campeonatos` WHERE `bet365_season` IS NOT NULL", function (error, campeonatos, fields) {
//     const todasPartidas = [];
//     const campeonatosLimite = campeonatos.length;

//     const getCampeonatoFixtures = (campeonatoIndice) => {
//         const campeonato = campeonatos[campeonatoIndice];
//         const proximo = campeonatoIndice + 1;

//         fixtures(campeonato.bet365_season).then(todosDadosDaLiga => {
//             const partidasLiga = todosDadosDaLiga.matches.filter(partida => !partida.canceled).map(partida => ({
//                 esporte: 1,
//                 campeonato: campeonato.id,
//                 bet365: partida._id,
//                 home_id: `(SELECT id FROM clubes WHERE bet365 = ${partida.teams.home._id})`,
//                 away_id: `(SELECT id FROM clubes WHERE bet365 = ${partida.teams.away._id})`,
//                 round: partida.round || -1,
//                 intervalo_home: partida.periods && partida.periods.p1 ? partida.periods.p1.home || -1 : `""`,
//                 intervalo_away: partida.periods && partida.periods.p1 ? partida.periods.p1.away || -1 : `""`,
//                 result_home: partida.periods && partida.periods.ft ? partida.periods.ft.home || -1 : `""`,
//                 result_away: partida.periods && partida.periods.ft ? partida.periods.ft.away || -1 : `""`,
//                 period: `"${partida.result.period}"`,
//                 vencedor:  `"${partida.result.winner}"`,
//                 week:  partida.week,
//                 comment:  `"${partida.comment}"`,
//                 stadiumid:  partida.stadiumid,
//                 matchdifficultyrating_home: partida.matchdifficultyrating ? partida.matchdifficultyrating.home || -1 : -1,
//                 matchdifficultyrating_away: partida.matchdifficultyrating ? partida.matchdifficultyrating.away || -1 : -1
//             }))

//             todasPartidas.push(...partidasLiga)
//         })
//         .finally(() => {
//             if(proximo < campeonatosLimite) {
//                 getCampeonatoFixtures(proximo)
//             } else {
//                 console.log('PRONTO PRA INSERIR AS PARTIDAS DO CAMPEONATO')
    
//                 const queryInserePartidas = `
//                     INSERT INTO partida (${Object.keys(todasPartidas[0]).join(',')})
//                     VALUES ${todasPartidas.map(partida => `(${Object.values(partida)})`).join(',')}`

//                 connection.query(queryInserePartidas, function (error, results, fields) {
//                     if (error) throw error;
//                     console.log('resultado queryInserePartidas:', results);

//                     const limite = todasPartidas.length;   
//                     const getJogadoresPartida = (indice) => {
//                         let partida = todasPartidas[indice];
    
//                         stats_match_lineup(partida.bet365).then(lineupStats => {
//                             const proximo = indice+1;
//                             const todosJogadores = []
                            
//                             try {
//                                 todosJogadores.push(...lineupStats.players.home.map(jogador => modelLineupInfos(jogador,partida)))
//                                 todosJogadores.push(...lineupStats.substitutes.home.map(jogador => modelLineupInfos(jogador,partida)))
//                                 todosJogadores.push(...lineupStats.players.away.map(jogador => modelLineupInfos(jogador,partida)))
//                                 todosJogadores.push(...lineupStats.substitutes.away.map(jogador => modelLineupInfos(jogador,partida)))
//                             } catch(e){
//                                 erros.push({partida: partida.bet365, erro: e})
//                             }

//                             todosJogadoresTodasPartidas.push(...todosJogadores)
//                             console.log(`get ${todosJogadores.length} Jogadores da Partida ${partida.bet365}`,proximo,' of ',limite)
    
//                             if(proximo < limite) {
//                                 getJogadoresPartida(proximo)
//                             } else {
//                                 console.log('PRONTO PRA INSERIR TODOS OS JOGADORES')
        
//                                 let camposDaTabela = Object.keys(todosJogadoresTodasPartidas[0]);
//                                 let valoresJogadores = todosJogadoresTodasPartidas
//                                     .map(jogador => `(${Object.values(jogador).join(',')})`)
//                                     .join(',')
                                    
//                                 let insereJogadoresRelacionados = `
//                                     INSERT INTO jogadores_partida (${camposDaTabela})
//                                     VALUES ${valoresJogadores}`;

//                                 fs.writeFile(`todosJogadores.json`, JSON.stringify(todosJogadoresTodasPartidas), () => {});
//                                 fs.writeFile(`insereJogadoresRelacionados.sql`, insereJogadoresRelacionados, () => {});
//                                 fs.writeFile(`erros.json`, JSON.stringify(erros), () => {});

        
//                                 // connection.query(insereJogadoresRelacionados, function (error, results, fields) {
//                                 //     if (error) throw error;
//                                 //     console.log('resultado insereJogadoresRelacionados:', results);
//                                 // });
//                             }
//                         })
//                     }
    
//                     getJogadoresPartida(0)                 
//                 });
//             }
//         })

//     };

//     getCampeonatoFixtures(0)
// });