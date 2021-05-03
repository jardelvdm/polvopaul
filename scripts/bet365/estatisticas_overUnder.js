const fs = require('fs');
const models = require('./models'),
      API = require('./api'),
      db = require('./db');

db.connect().then(() => {
    db.campeonatosPais(51).then(campeonatos => {
        let campeonato = campeonatos[0];

        db.timesPais(51).then(timesPais => {
            API.overunderTimes(campeonato.bet365_season).then(stats => {
                // console.log('timesPais',timesPais)
                let estatisticasFormatadas = stats.map(s => 
                        models.modelEstatisticas_overUnder_clube(
                            s,
                            timesPais.find(time => time.bet365 == s.team._id).id
                        )
                    )
                
                const keys = Object.keys(estatisticasFormatadas[0]).join(',')

                const insereEstatisticasClubes = `
                    INSERT INTO overunder_clube (${keys})
                    VALUES ${estatisticasFormatadas.map(s => `(${Object.values(s)})`).join(',')}
                `
                db.freestyle(insereEstatisticasClubes)
            })
        })
    })
})