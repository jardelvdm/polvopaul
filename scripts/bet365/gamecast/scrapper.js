// lista de endpoints pra usar e a estrutura deles pra chegar nos resultados interessantes

const idPartidaInicial = 23032383; // a partir desse id, podemos consultar na api as partidas anteriories e ir parseando elas
let bayernMunique = 2672;
let idTime = bayernMunique;

const stats_match_get = (idPartida) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/en/Europe:London/gismo/stats_match_get/${idPartida}`).then(res => res.json()).then(res => resolve(res)).catch(err => reject(err)))
const stats_match_lineup = (idPartida) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/en/Europe:Berlin/gismo/stats_match_lineup/${idPartida}`).then(res => res.json()).then(res => resolve(res)).catch(err => reject(err)))
const match_squads = (idPartida) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/en/Europe:London/gismo/match_squads/${idPartida}`).then(res => res.json()).then(res => resolve(res)).catch(err => reject(err)))

const parseHistoricoTime = (idPartidaInicial,idTime,iteracoes,limite) => {
    stats_match_get(idPartidaInicial).then(res => {
        console.group('stats_match_get')
            console.log('matchweather',res.doc[0].data.matchweather)
    
            console.group('home')
                const time_home = res.doc[0].data.teams.home
                const time_home_id = time_home.uid;
                const time_home_nome = time_home.name;
    
                console.log(time_home_nome)
                console.log('nextMatch',res.doc[0].data.teamhistory[time_home_id].next)
                console.log('previousMatch',res.doc[0].data.teamhistory[time_home_id].previous)
            console.groupEnd()
            
            console.group('home')
                const time_away = res.doc[0].data.teams.away
                const time_away_id = time_away.uid;
                const time_away_nome = time_away.name;
    
                console.log(time_away_nome)
                console.log('nextMatch', res.doc[0].data.teamhistory[time_away_id].next)
                console.log('previousMatch', res.doc[0].data.teamhistory[time_away_id].previous)
            console.groupEnd()
        console.groupEnd()

        let proximaIteracao = iteracoes+1;
        if(proximaIteracao < limite){
            let idProximaPartida;
            if(idTime == time_home_id) {
                idProximaPartida = res.doc[0].data.teamhistory[time_home_id].previous
            } else {
                idProximaPartida = res.doc[0].data.teamhistory[time_away_id].previous
            }
            parseHistoricoTime(idProximaPartida,idTime,iteracoes+1,limite)
        }
    })
}

parseHistoricoTime(idPartidaInicial,idTime,0,20)

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