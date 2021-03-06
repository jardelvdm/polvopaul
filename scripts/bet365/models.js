const moment = require("moment")
const { stats } = require("./bet365")

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
    }),
    modelEstatisticas_overUnder_clube: (stats,clubeID) => ({
        clube:clubeID,
        matches: stats.matches,
        homematches: stats.homematches,
        awaymatches: stats.awaymatches,
        goalsscored_p1_total: stats.goalsscored.p1.total,
        goalsscored_p1_average: stats.goalsscored.p1.average,
        goalsscored_p1_atleastonegoal: stats.goalsscored.p1.atleastonegoal,
        goalsscored_p1_matches: stats.goalsscored.p1.matches,
        goalsscored_p1_home_total: stats.goalsscored.p1home.total,
        goalsscored_p1_home_average: stats.goalsscored.p1home.average,
        goalsscored_p1_home_atleastonegoal: stats.goalsscored.p1home.atleastonegoal,
        goalsscored_p1_home_matches: stats.goalsscored.p1home.matches,
        goalsscored_p1_away_total: stats.goalsscored.p1away.total,
        goalsscored_p1_away_average: stats.goalsscored.p1away.average,
        goalsscored_p1_away_atleastonegoal: stats.goalsscored.p1away.atleastonegoal,
        goalsscored_p1_away_matches: stats.goalsscored.p1away.matches,
        goalsscored_ft_total: stats.goalsscored.ft.total,
        goalsscored_ft_average: stats.goalsscored.ft.average,
        goalsscored_ft_atleastonegoal: stats.goalsscored.ft.atleastonegoal,
        goalsscored_ft_matches: stats.goalsscored.ft.matches,
        goalsscored_ft_home_total: stats.goalsscored.fthome.total,
        goalsscored_ft_home_average: stats.goalsscored.fthome.average,
        goalsscored_ft_home_atleastonegoal: stats.goalsscored.fthome.atleastonegoal,
        goalsscored_ft_home_matches: stats.goalsscored.fthome.matches,
        goalsscored_ft_away_total: stats.goalsscored.ftaway.total,
        goalsscored_ft_away_average: stats.goalsscored.ftaway.average,
        goalsscored_ft_away_atleastonegoal: stats.goalsscored.ftaway.atleastonegoal,
        goalsscored_ft_away_matches: stats.goalsscored.ftaway.matches,
        goalsscored_p2_total: stats.goalsscored.p2.total,
        goalsscored_p2_average: stats.goalsscored.p2.average,
        goalsscored_p2_atleastonegoal: stats.goalsscored.p2.atleastonegoal,
        goalsscored_p2_matches: stats.goalsscored.p2.matches,
        goalsscored_p2_home_total: stats.goalsscored.p2home.total,
        goalsscored_p2_home_average: stats.goalsscored.p2home.average,
        goalsscored_p2_home_atleastonegoal: stats.goalsscored.p2home.atleastonegoal,
        goalsscored_p2_home_matches: stats.goalsscored.p2home.matches,
        goalsscored_p2_away_total: stats.goalsscored.p2away.total,
        goalsscored_p2_away_average: stats.goalsscored.p2away.average,
        goalsscored_p2_away_atleastonegoal: stats.goalsscored.p2away.atleastonegoal,
        goalsscored_p2_away_matches: stats.goalsscored.p2away.matches,
        conceded_p1_total: stats.conceded.p1.total,
        conceded_p1_average: stats.conceded.p1.average,
        conceded_p1_cleansheets: stats.conceded.p1.cleansheets,
        conceded_p1_matches: stats.conceded.p1.matches,
        conceded_p1_home_total: stats.conceded.p1home.total,
        conceded_p1_home_average: stats.conceded.p1home.average,
        conceded_p1_home_cleansheets: stats.conceded.p1home.cleansheets,
        conceded_p1_home_matches: stats.conceded.p1home.matches,
        conceded_p1_away_total: stats.conceded.p1away.total,
        conceded_p1_away_average: stats.conceded.p1away.average,
        conceded_p1_away_cleansheets: stats.conceded.p1away.cleansheets,
        conceded_p1_away_matches: stats.conceded.p1away.matches,
        conceded_ft_total: stats.conceded.ft.total,
        conceded_ft_average: stats.conceded.ft.average,
        conceded_ft_cleansheets: stats.conceded.ft.cleansheets,
        conceded_ft_matches: stats.conceded.ft.matches,
        conceded_ft_home_total: stats.conceded.fthome.total,
        conceded_ft_home_average: stats.conceded.fthome.average,
        conceded_ft_home_cleansheets: stats.conceded.fthome.cleansheets,
        conceded_ft_home_matches: stats.conceded.fthome.matches,
        conceded_ft_away_total: stats.conceded.ftaway.total,
        conceded_ft_away_average: stats.conceded.ftaway.average,
        conceded_ft_away_cleansheets: stats.conceded.ftaway.cleansheets,
        conceded_ft_away_matches: stats.conceded.ftaway.matches,
        conceded_p2_total: stats.conceded.p2.total,
        conceded_p2_average: stats.conceded.p2.average,
        conceded_p2_cleansheets: stats.conceded.p2.cleansheets,
        conceded_p2_matches: stats.conceded.p2.matches,
        conceded_p2_home_total: stats.conceded.p2home.total,
        conceded_p2_home_average: stats.conceded.p2home.average,
        conceded_p2_home_cleansheets: stats.conceded.p2home.cleansheets,
        conceded_p2_home_matches: stats.conceded.p2home.matches,
        conceded_p2_away_total: stats.conceded.p2away.total,
        conceded_p2_away_average: stats.conceded.p2away.average,
        conceded_p2_away_cleansheets: stats.conceded.p2away.cleansheets,
        conceded_p2_away_matches: stats.conceded.p2away.matches,
        total_p1_0_5_over: stats.total.p1['0.5'].over,
        total_p1_0_5_under: stats.total.p1['0.5'].under,
        total_p1_1_5_over: stats.total.p1['1.5'].over,
        total_p1_1_5_under: stats.total.p1['1.5'].under,
        total_p1_2_5_over: stats.total.p1['2.5'].over,
        total_p1_2_5_under: stats.total.p1['2.5'].under,
        total_p1_3_5_over: stats.total.p1['3.5'].over,
        total_p1_3_5_under: stats.total.p1['3.5'].under,
        total_p1_4_5_over: stats.total.p1['4.5'].over,
        total_p1_4_5_under: stats.total.p1['4.5'].under,
        total_p1_5_5_over: stats.total.p1['5.5'].over,
        total_p1_5_5_under: stats.total.p1['5.5'].under,
        total_ft_0_5_over: stats.total.ft['0.5'].over,
        total_ft_0_5_under: stats.total.ft['0.5'].under,
        total_ft_1_5_over: stats.total.ft['1.5'].over,
        total_ft_1_5_under: stats.total.ft['1.5'].under,
        total_ft_2_5_over: stats.total.ft['2.5'].over,
        total_ft_2_5_under: stats.total.ft['2.5'].under,
        total_ft_3_5_over: stats.total.ft['3.5'].over,
        total_ft_3_5_under: stats.total.ft['3.5'].under,
        total_ft_4_5_over: stats.total.ft['4.5'].over,
        total_ft_4_5_under: stats.total.ft['4.5'].under,
        total_ft_5_5_over: stats.total.ft['5.5'].over,
        total_ft_5_5_under: stats.total.ft['5.5'].under,
        total_p2_0_5_over: stats.total.p2['0.5'].over,
        total_p2_0_5_under: stats.total.p2['0.5'].under,
        total_p2_1_5_over: stats.total.p2['1.5'].over,
        total_p2_1_5_under: stats.total.p2['1.5'].under,
        total_p2_2_5_over: stats.total.p2['2.5'].over,
        total_p2_2_5_under: stats.total.p2['2.5'].under,
        total_p2_3_5_over: stats.total.p2['3.5'].over,
        total_p2_3_5_under: stats.total.p2['3.5'].under,
        total_p2_4_5_over: stats.total.p2['4.5'].over,
        total_p2_4_5_under: stats.total.p2['4.5'].under,
        total_p2_5_5_over: stats.total.p2['5.5'].over,
        total_p2_5_5_under: stats.total.p2['5.5'].under,
        home_p1_0_5_over: stats.home.p1['0.5'].over,
        home_p1_0_5_under: stats.home.p1['0.5'].under,
        home_p1_1_5_over: stats.home.p1['1.5'].over,
        home_p1_1_5_under: stats.home.p1['1.5'].under,
        home_p1_2_5_over: stats.home.p1['2.5'].over,
        home_p1_2_5_under: stats.home.p1['2.5'].under,
        home_p1_3_5_over: stats.home.p1['3.5'].over,
        home_p1_3_5_under: stats.home.p1['3.5'].under,
        home_p1_4_5_over: stats.home.p1['4.5'].over,
        home_p1_4_5_under: stats.home.p1['4.5'].under,
        home_p1_5_5_over: stats.home.p1['5.5'].over,
        home_p1_5_5_under: stats.home.p1['5.5'].under,
        home_ft_0_5_over: stats.home.ft['0.5'].over,
        home_ft_0_5_under: stats.home.ft['0.5'].under,
        home_ft_1_5_over: stats.home.ft['1.5'].over,
        home_ft_1_5_under: stats.home.ft['1.5'].under,
        home_ft_2_5_over: stats.home.ft['2.5'].over,
        home_ft_2_5_under: stats.home.ft['2.5'].under,
        home_ft_3_5_over: stats.home.ft['3.5'].over,
        home_ft_3_5_under: stats.home.ft['3.5'].under,
        home_ft_4_5_over: stats.home.ft['4.5'].over,
        home_ft_4_5_under: stats.home.ft['4.5'].under,
        home_ft_5_5_over: stats.home.ft['5.5'].over,
        home_ft_5_5_under: stats.home.ft['5.5'].under,
        home_p2_0_5_over: stats.home.p2['0.5'].over,
        home_p2_0_5_under: stats.home.p2['0.5'].under,
        home_p2_1_5_over: stats.home.p2['1.5'].over,
        home_p2_1_5_under: stats.home.p2['1.5'].under,
        home_p2_2_5_over: stats.home.p2['2.5'].over,
        home_p2_2_5_under: stats.home.p2['2.5'].under,
        home_p2_3_5_over: stats.home.p2['3.5'].over,
        home_p2_3_5_under: stats.home.p2['3.5'].under,
        home_p2_4_5_over: stats.home.p2['4.5'].over,
        home_p2_4_5_under: stats.home.p2['4.5'].under,
        home_p2_5_5_over: stats.home.p2['5.5'].over,
        home_p2_5_5_under: stats.home.p2['5.5'].under,
        away_p1_0_5_over: stats.away.p1['0.5'].over,
        away_p1_0_5_under: stats.away.p1['0.5'].under,
        away_p1_1_5_over: stats.away.p1['1.5'].over,
        away_p1_1_5_under: stats.away.p1['1.5'].under,
        away_p1_2_5_over: stats.away.p1['2.5'].over,
        away_p1_2_5_under: stats.away.p1['2.5'].under,
        away_p1_3_5_over: stats.away.p1['3.5'].over,
        away_p1_3_5_under: stats.away.p1['3.5'].under,
        away_p1_4_5_over: stats.away.p1['4.5'].over,
        away_p1_4_5_under: stats.away.p1['4.5'].under,
        away_p1_5_5_over: stats.away.p1['5.5'].over,
        away_p1_5_5_under: stats.away.p1['5.5'].under,
        away_ft_0_5_over: stats.away.ft['0.5'].over,
        away_ft_0_5_under: stats.away.ft['0.5'].under,
        away_ft_1_5_over: stats.away.ft['1.5'].over,
        away_ft_1_5_under: stats.away.ft['1.5'].under,
        away_ft_2_5_over: stats.away.ft['2.5'].over,
        away_ft_2_5_under: stats.away.ft['2.5'].under,
        away_ft_3_5_over: stats.away.ft['3.5'].over,
        away_ft_3_5_under: stats.away.ft['3.5'].under,
        away_ft_4_5_over: stats.away.ft['4.5'].over,
        away_ft_4_5_under: stats.away.ft['4.5'].under,
        away_ft_5_5_over: stats.away.ft['5.5'].over,
        away_ft_5_5_under: stats.away.ft['5.5'].under,
        away_p2_0_5_over: stats.away.p2['0.5'].over,
        away_p2_0_5_under: stats.away.p2['0.5'].under,
        away_p2_1_5_over: stats.away.p2['1.5'].over,
        away_p2_1_5_under: stats.away.p2['1.5'].under,
        away_p2_2_5_over: stats.away.p2['2.5'].over,
        away_p2_2_5_under: stats.away.p2['2.5'].under,
        away_p2_3_5_over: stats.away.p2['3.5'].over,
        away_p2_3_5_under: stats.away.p2['3.5'].under,
        away_p2_4_5_over: stats.away.p2['4.5'].over,
        away_p2_4_5_under: stats.away.p2['4.5'].under,
        away_p2_5_5_over: stats.away.p2['5.5'].over,
        away_p2_5_5_under: stats.away.p2['5.5'].under
    }),
    modelEstatisticas_desempenho_clube: (stats,clubeID) => ({
        clube: clubeID,
        matches: stats.goal_attempts.matches,
        goal_attempts_average: stats.goal_attempts.average,
        goal_attempts_total: stats.goal_attempts.total,
        shots_on_goal_average: stats.shots_on_goal.average,
        shots_on_goal_total: stats.shots_on_goal.total,
        shots_off_goal_average: stats.shots_off_goal.average,
        shots_off_goal_total: stats.shots_off_goal.total,
        corner_kicks_average: stats.corner_kicks.average,
        corner_kicks_total: stats.corner_kicks.total,
        ball_possession_average: stats.ball_possession.average,
        ball_possession_total: stats.ball_possession.total,
        shots_blocked_average: stats.shots_blocked.average,
        shots_blocked_total: stats.shots_blocked.total,
        cards_given_average: stats.cards_given.average,
        cards_given_total: stats.cards_given.total,
        freekicks_average: stats.freekicks.average,
        freekicks_total: stats.freekicks.total,
        offside_average: stats.offside.average,
        offside_total: stats.offside.total,
        shots_on_post_average: stats.shots_on_post.average,
        shots_on_post_total: stats.shots_on_post.total,
        shots_on_bar_average: stats.shots_on_bar.average,
        shots_on_bar_total: stats.shots_on_bar.total,
        goals_by_foot_average: stats.goals_by_foot.average,
        goals_by_foot_total: stats.goals_by_foot.total,
        goals_by_head_average: stats.goals_by_head.average,
        goals_by_head_total: stats.goals_by_head.total,
        attendance_average: stats.attendance ? stats.attendance.average : -1,
        attendance_total: stats.attendance ? stats.attendance.total : -1,
        yellow_cards_average: stats.yellow_cards.average,
        yellow_cards_total: stats.yellow_cards.total,
        red_cards_average: stats.red_cards.average,
        red_cards_total: stats.red_cards.total,
        goals_scored_average: stats.goals_scored.average,
        goals_scored_total: stats.goals_scored.total,
        goals_conceded_average: stats.goals_conceded.average,
        goals_conceded_total: stats.goals_conceded.total,
        yellowred_cards_average: stats.yellowred_cards.average,
        yellowred_cards_total: stats.yellowred_cards.total,
        shootingefficiency_average: stats.shootingefficiency.average,
        shootingefficiency_total: `"${stats.shootingefficiency.total}"`,
        penalty_success_count_average: stats.penalty_success_count && stats.penalty_success_count.average ? stats.penalty_success_count.average : -1,
        penalty_success_count_total: `"${stats.penalty_success_count && stats.penalty_success_count.total ? stats.penalty_success_count.total : null}"`,
        clean_sheet_average: stats.clean_sheet && stats.clean_sheet.average ? stats.clean_sheet.average : -1,
        clean_sheet_total: `"${stats.clean_sheet.total}"`
    }),
    modelEstatisticas_jogador: (stats,jogador_clubeID) => ({
        jogador_clube: jogador_clubeID,
        active: stats.active,
        assists: stats.assists || 0,
        corners: stats.corners || 0,
        first_goals: stats.first_goals || 0,
        goal_points: stats.goal_points || 0,
        goals: stats.goals || 0,
        goals_by_header: stats.goals_by_header || 0,
        last_goals: stats.last_goals || 0,
        lastevent: `${stats.lastevent ? moment(stats.lastevent.split(' ')[0],'DD MM YY').format('YYYY-MM-DD').replace('Invalid date',null) : "null"}`,
        matches: stats.matches || 0,
        matches_drawn: stats.matches_drawn || 0,
        matches_lost: stats.matches_lost || 0,
        matches_won: stats.matches_won || 0,
        minutes_played: stats.minutes_played || 0,
        number_of_cards_1st_half: stats.number_of_cards_1st_half || 0,
        number_of_cards_2nd_half: stats.number_of_cards_2nd_half || 0,
        offside: stats.offside || 0,
        own_goals: stats.own_goals || 0,
        penalties: stats.penalties || 0,
        red_cards: stats.red_cards || 0,
        shots_blocked: stats.shots_blocked || 0,
        shots_off_goal: stats.shots_off_goal || 0,
        shots_on_goal: stats.shots_on_goal || 0,
        started: stats.started || 0,
        substituted_in: stats.substituted_in || 0,
        substituted_out: stats.substituted_out || 0,
        team_conceded: stats.team_conceded || 0,
        team_matches: stats.team_matches || 0,
        team_scored: stats.team_scored || 0,
        total_shots: stats.total_shots || 0,
        yellow_cards: stats.yellow_cards || 0,
        yellowred_card: stats.yellowred_card || 0,
        yellowred_cards: stats.yellowred_cards || 0,
    })
}