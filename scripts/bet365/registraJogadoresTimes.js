const fs = require('fs');
const models = require('./models'),
      bet365 = require('./bet365'),
      db = require('../db');

db.connect().then(() => {
    let query;

    // idCampeonato = 905
    // query = db.campeonato(idCampeonato)
        // OU
    // const queryCampeonatosDePaises = "SELECT * FROM `paises` AS `p` INNER JOIN `campeonatos` ON `campeonatos`.`pais` = `p`.`id` WHERE `p`.`nome` = 'Brasil'  GROUP BY `campeonatos`.`bet365_season`";
    // db.freestyle(queryCampeonatosDePaises)

    db.timesPais('França').then(times => {
        // console.log(times,times.length)
        // return;
        let keys = null;
        
        function insereJogadoresTime (indiceTimesLista) {
            const time = times[indiceTimesLista]
            console.log(indiceTimesLista,time)
    
            bet365.plantelTime(time.bet365).then(plantel => {  
                let jogadores = plantel.jogadores.map(models.modelJogador);
                let jogadoresLength = jogadores.length;
                console.log(jogadoresLength)

                if(!keys){
                    keys = Object.keys(jogadores[0]);
                }

                function insereJogador (indiceJogadorLista) {
                    let jogador = jogadores[indiceJogadorLista];
                    db.freestyle(
                        `INSERT INTO jogadores (${keys}) VALUES (${Object.values(jogador).join(',')})`
                    ).then(() => {
                        db.freestyle(`INSERT INTO jogadores_clube (jogador_id,clube_id) VALUES (LAST_INSERT_ID(),${time.id})`)  
                            .then(() => {
                                if(indiceJogadorLista+1 < jogadoresLength) {
                                    insereJogador(indiceJogadorLista+1)
                                } else {
                                    console.log('todos adicionados')
                                    if(indiceTimesLista+1 < times.length)
                                        insereJogadoresTime(indiceTimesLista+1)
                                }
                            })
                    })
                }

                insereJogador(0);
            }).catch(erro => {
                fs.writeFile(`erros/${time.bet365}.json`, JSON.stringify(erro), () => {
                    if(indiceTimesLista+1 < times.length)
                        insereJogadoresTime(indiceTimesLista+1)
                });

            })
        };

        insereJogadoresTime(69)

        // let allClubes = [campeonatos.length];

        // campeonatos.forEach((campeonato,arrayIndice) => {
        //     let i = Number(arrayIndice);

        //     bet365.timesLiga(campeonato.bet365_season).then(times => {
        //         console.log(campeonato.nome,times.length)
        //         allClubes[i] = times.map(time => models.modelClube(time.team,campeonato.pais));

        //         if(allClubes.filter(i => i).length == campeonatos.length){
        //             console.log('todos campeonatos',allClubes.length)
        //             const listaClubes = allClubes.reduce((a,b) => a.concat(b));
        //             console.log('totalClubes',listaClubes.length)

        //             db.registraVariosClubes(listaClubes)
        //                 .then(result => console.log('deu bom',result))
        //                 .catch(error => console.log('deu ruim',error))
        //         }
        //     })
        // })
    })
})