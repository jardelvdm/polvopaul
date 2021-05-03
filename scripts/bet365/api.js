const fetch = require('node-fetch');

const API = {
    stats: {
        season: {
            overUnder: (idTemporada) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/br/Europe:London/gismo/stats_season_overunder/${idTemporada}`).then(res => res.json()).then(res => resolve(res.doc[0].data)).catch(err => reject(err))),
            fixtures: (idTemporada) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/br/Europe:London/gismo/stats_season_fixtures2/${idTemporada}/1`).then(res => res.json()).then(res => resolve(res.doc[0].data)).catch(err => reject(err))),
            uniqueteamstats: (idTemporada) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/br/Europe:Berlin/gismo/stats_season_uniqueteamstats/${idTemporada}`).then(res => res.json()).then(res => resolve(res.doc[0].data)).catch(err => reject(err))),
        },
        match: {
            stats_match_get: (idPartida) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/en/Europe:Berlin/gismo/stats_match_lineup/${idPartida}`).then(res => res.json()).then(res => resolve(res.doc[0].data)).catch(err => reject(err))),
            stats_match_timeline: (idPartida) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/en/Europe:London/gismo/stats_match_timeline/${idPartida}`).then(res => res.json()).then(res => resolve(res.doc[0].data)).catch(err => reject(err))),
            stats_match_lineup: (idPartida) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/en/Europe:Berlin/gismo/stats_match_lineup/${idPartida}`).then(res => res.json()).then(res => resolve(res.doc[0].data)).catch(err => reject(err)))
        }
    },
    detalhesLiga: idTemporada => API.stats.season.fixtures(idTemporada),
    timesLiga: (idTemporada) => new Promise((resolve,reject) => API.stats.season.overUnder(idTemporada).then(data => resolve(Object.values(data.stats))).catch(err => reject(err))),
    partidasTemporada: idTemporada => new Promise((resolve,reject) => API.detalhesLiga(idTemporada).then(todosDadosDaLiga => resolve(todosDadosDaLiga.matches)).catch(err => reject(err))),
    infosTime: (idTime) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/br/Europe:Berlin/gismo/stats_team_info/${idTime}`).then(res => res.json()).then(res => resolve(res.doc[0].data)).catch(err => reject(err))),
    plantelTime: (idTime) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/br/Europe:London/gismo/stats_team_squad/${idTime}`).then(res => res.json()).then(res => resolve({tecnico: res.doc[0].data.managers[0], jogadores: res.doc[0].data.players})).catch(err => reject(err))),
    detalhesJogador: (idTime,bet365_jogador) => new Promise((resolve,reject) => API.plantelTime(idTime).then(elenco => resolve(elenco.jogadores.find(j => j._id == bet365_jogador))).catch(err => reject(err))),
    detalhesPartida: (idTemporada,bet365_partida) => new Promise((resolve,reject) => {
        const partida = {
            detalhes: null,
            timeline: null,
            lineup: null
        }

        API.stats.match.stats_match_get(bet365_partida).then(detalhes => {
            partida.detalhes = detalhes;

            API.stats.match.stats_match_timeline(bet365_partida).then(timeline => {
                partida.timeline = timeline;

                API.stats.match.stats_match_lineup(bet365_partida).then(lineup => {
                    partida.lineup = {
                        home: {
                            players: lineup.players.home,
                            substitutes: lineup.substitutes.home
                        },
                        away: {
                            players: lineup.players.away,
                            substitutes: lineup.substitutes.away
                        }
                    }
                })
                .then(() => resolve(partida))
            })
        })
    }),
    timeEsperado: (idTime,idTemporada) => new Promise((resolve,reject) => fetch(`https://stats.fn.sportradar.com/bet365/br/Europe:Berlin/gismo/stats_team_usuallineup/${idTime}/${idTemporada}`).then(res => res.json()).then(res => resolve(res.doc[0].data)).catch(err => reject(err))),
    overunderTimes: (idTemporada) =>  new Promise((resolve,reject) => API.stats.season.overUnder(idTemporada).then(data => resolve(Object.values(data.stats))).catch(err => reject(err))),
    teamstats: (idTemporada) =>  new Promise((resolve,reject) => API.stats.season.uniqueteamstats(idTemporada).then(data => resolve(Object.values(data.stats.uniqueteams))).catch(err => reject(err)))
}

module.exports = API;