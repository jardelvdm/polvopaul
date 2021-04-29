// lista de endpoints pra usar e a estrutura deles pra chegar nos resultados interessantes

const partidaInicial = 26493690; // a partir desse id, podemos consultar na api as partidas anteriories e ir parseando elas
const stats_match_get = (idPartida) => `https://stats.fn.sportradar.com/bet365/en/Europe:London/gismo/stats_match_get/${idPartida}`
const stats_match_lineup = (idPartida) => `https://stats.fn.sportradar.com/bet365/en/Europe:Berlin/gismo/stats_match_lineup/${idPartida}`
const match_squads = (idPartida) => `https://stats.fn.sportradar.com/bet365/en/Europe:London/gismo/match_squads/${idPartida}`

stats_match_get.doc[0].data.matchweather
stats_match_get.doc[0].data.teamhistory[teamid1,teamid2].previous
stats_match_get.doc[0].data.teamhistory[teamid1,teamid2].next

match_squads.doc[0].data
match_squads.doc[0].data.events
match_squads.doc[0].data.[home/away].startinglineup
match_squads.doc[0].data.[home/away].startinglineup.formation
match_squads.doc[0].data.[home/away].startinglineup.players
match_squads.doc[0].data.[home/away].startinglineup.players.map(p => p.playerid)
match_squads.doc[0].data.[home/away].substitutes
match_squads.doc[0].data.[home/away].substitutions // combinação de .startinglineup e .substitutes

match_squads.doc[0].data.match
match_squads.doc[0].data.match.cards
match_squads.doc[0].data.match.result