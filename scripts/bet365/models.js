const moment = require("moment")

module.exports = {
    modelClube: (clube,paisID) => ({
        abbr: `"${clube.abbr}"`,
        founded: `"${clube.founded}"`,
        iscountry: typeof clube.iscountry == 'boolean' ? clube.iscountry : false,
        mediumname: `"${clube.mediumname}"`,
        name: `"${clube.name}"`,
        nickname: `"${clube.nickname}"`,
        sex: `"${clube.sex}"`,
        suffix: `"${clube.suffix}"`,
        bet365: clube._id,
        country: clube.pais || paisID
    }),
    modelJogador: jogador => ({
        nome: `"${jogador.name}"`,
        nascimento: `"${jogador.birthdate ? moment(jogador.birthdate.date,'DD MM YY').format('YYYY-MM-DD') : `2021-05-03`}"`,
        posicao: `"${jogador.position.shortname}"`,
        numero: parseInt(jogador.shirtnumber || -1),
        bet365: `"${jogador._id}"`,
        height: parseInt(jogador.height),
        weight: parseInt(jogador.weight),
        marketValue: `"${jogador.marketvalue || -1}"`,
        nationality: `"${jogador.nationality ? jogador.nationality.name : null}"`,
        nickname: `"${jogador.nickname}"`
    }),
    modelPartidas: (partida,campeonatoID) => ({
        esporte: 1,
        campeonato: campeonatoID,
        bet365: partida._id,
        data: `"${partida.time ? moment(partida.time.date,'DD MM YY').format('YYYY-MM-DD') : `1976-01-01`}"`,
        home_id: `(SELECT id FROM clubes WHERE bet365 = '${partida.teams.home.uid}' LIMIT 1)`,
        away_id: `(SELECT id FROM clubes WHERE bet365 = '${partida.teams.away.uid}' LIMIT 1)`,
        round: partida.round,
        intervalo_home: partida.periods && partida.periods.p1 && partida.periods.p1.home != null ? partida.periods.p1.home : -1,
        intervalo_away: partida.periods && partida.periods.p1 && partida.periods.p1.away != null ? partida.periods.p1.away : -1,
        result_home: partida.result && partida.result.home != null ? partida.result.home : -1 ,
        result_away: partida.result && partida.result.away != null ? partida.result.away : -1 ,
        period: `"${partida.result.period}"`,
        vencedor: `"${partida.result.winner}"`,
        week: partida.week,
        comment: `"${partida.comment}"`,
        stadiumid: partida.stadiumid,
        matchdifficultyrating_home: partida.matchdifficultyrating ? partida.matchdifficultyrating.home || -1 : -1,
        matchdifficultyrating_away: partida.matchdifficultyrating ? partida.matchdifficultyrating.away || -1 : -1,
    }),
    modelJogadorPartida: (jogador,partidaID,local,titular,jogador_clubeID) => ({
        partida: partidaID,
        jogador_clube: jogador_clubeID ? jogador_clubeID.jcid : null,
        bet365: jogador.player._id,
        local: local,
        titular: titular,
        shirtnumber: parseInt(jogador.shirtnumber || -1),
        minutosjogados: jogador.minutosjogados || 0
    }),
    modelEventosPartida: (partidaID,evento) => ({
        partida: partidaID,
        bet365: evento._id,
        typeid: evento._typeid,
        type: `"${evento.type}"`,
        matchid: evento.matchid,
        time: evento.time,
        seconds: evento.seconds,
        name: `"${evento.name}"`,
        team: `"${evento.team}"`,
        player: evento.player && evento.player._id ? evento.player._id : "null",
        X: evento.X || -1,
        Y: evento.Y || -1
    })
}