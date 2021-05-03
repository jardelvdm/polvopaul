const fs = require('fs');
const models = require('./models'),
      API = require('./api'),
      db = require('./db');

// [64,45,3,51]
// [inglaterra,espanha,alemanha,franca]

db.connect().then(() => {
    db.campeonatosPais(3).then(campeonatos => {
        let campeonato = campeonatos[0];

        db.timesPais(3).then(timesPais => {
            API.teamstats(campeonato.bet365_season).then(stats => {
                let estatisticasFormatadas = stats.map(s => 
                        models.modelEstatisticas_desempenho_clube(
                            s,
                            timesPais.find(time => time.bet365 == s.uniqueteam._id).id
                        )
                    )
                
                const keys = Object.keys(estatisticasFormatadas[0]).join(',')

                const insereEstatisticasClubes = `
                    INSERT INTO desempenho_clube (${keys})
                    VALUES ${estatisticasFormatadas.map(s => `(${Object.values(s)})`).join(',')}
                `
                db.freestyle(insereEstatisticasClubes)
            })
        })
    })
})