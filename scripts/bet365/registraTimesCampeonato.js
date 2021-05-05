const models = require('./models'),
      API = require('./api'),
      db = require('../db');

db.connect().then(() => {
    let query;

    idCampeonato = 905
    query = db.campeonato(idCampeonato)
        // OU
    // const queryCampeonatosDePaises = "SELECT * FROM `paises` AS `p` INNER JOIN `campeonatos` ON `campeonatos`.`pais` = `p`.`id` WHERE `p`.`nome` = 'Brasil'  GROUP BY `campeonatos`.`bet365_season`";
    // db.freestyle(queryCampeonatosDePaises)

    query.then(campeonatos => {
        let allClubes = [campeonatos.length];

        campeonatos.forEach((campeonato,arrayIndice) => {
            let i = Number(arrayIndice);

            API.timesLiga(campeonato.bet365_season).then(times => {
                console.log(campeonato.nome,times.length)
                allClubes[i] = times.map(time => models.modelClube(time.team,campeonato.pais));

                if(allClubes.filter(i => i).length == campeonatos.length){
                    console.log('todos campeonatos',allClubes.length)
                    const listaClubes = allClubes.reduce((a,b) => a.concat(b));
                    console.log('totalClubes',listaClubes.length)

                    db.registraVariosClubes(listaClubes)
                        .then(result => console.log('deu bom',result))
                        .catch(error => console.log('deu ruim',error))
                }
            })
        })
    })
})