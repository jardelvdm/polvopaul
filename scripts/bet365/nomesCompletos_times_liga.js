query = (idLiga) => fetch(`https://stats.fn.sportradar.com/bet365/br/Europe:London/gismo/stats_season_overunder/${idLiga}`);

const ctrlc = copy;

query
    .then(res => res.json())
    .then(res => {
        copy(
            Object.values(res.doc[0].data.stats)
                .map(team => [team.team.name,team.team.mediumname,team.team.abbr,team.team.nickname])
                .map(sql => `
                    UPDATE clubes 
                    SET mediumname="${sql[1]}", abbr="${sql[2]}", nickname="${sql[3]}" 
                    WHERE clubes.nome="${sql[0]}"
                `).join(';')
        )
    })