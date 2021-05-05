const fs = require('fs');
const models = require('./models'),
      API = require('./api'),
      db = require('./db');

// [64,45,3,51]
// [inglaterra,espanha,alemanha,franca]

let erros = [];
const paises = [
    {id:64,nome:'inglaterra'},
    {id:45,nome:'espanha'},
    {id:3,nome:'alemanha'},
    {id:51,nome:'franca'},
]
const paisesLength = paises.length;


db.connect().then(() => {
    function processaCampeonatosPais(indicePais) {
        db.campeonatosPais(paises[indicePais].id)
            .then(campeonatos => {        
                const campeonatosLength = campeonatos.length;
        
                function processaCampeonato (indiceCampeonato) {
                    let campeonato = campeonatos[indiceCampeonato];
        
                    API.timesLiga(campeonato.bet365_season).then(timesLiga => {
                        const timesLength = timesLiga.length;
                        
                        function processaTime(indiceTime) {
                            const time = timesLiga[indiceTime].team;
            
                            API.jogadoresStats(campeonato.bet365_season,time._id).then(jogadoresStats => {
                                const keys = Object.keys(models.modelEstatisticas_jogador({},-1)).join(',')
            
                                db.jogadores.porClube(time._id).then(jogadoresClube => {
                                    const jogadores_estatisticas = jogadoresStats.map((jogadorStats,idx) => {
                                        try {
                                            const jogador_clubeID = jogadoresClube.find(jc => jc.bet365 == jogadorStats.stats.playerid).id;
                                            return models.modelEstatisticas_jogador(jogadorStats.stats.teams[time._id].seasons[campeonato.bet365_season],jogador_clubeID)
                                        } catch(e) {
                                            erros.push(
                                                {indiceErro: jogadoresStats[idx], erro: e}
                                            )
                                        }
                                    })
            
                                    let insert_jogadores_estatisticas = jogadores_estatisticas.filter(item => item).map(s => `(${Object.values(s).map(v => v || "null")})`).join(',');

                                    if(insert_jogadores_estatisticas) {
                                        const insereEstatisticasClubes = `
                                            INSERT INTO jogadores_estatisticas (${keys})
                                            VALUES ${insert_jogadores_estatisticas}
                                        `
                
                                        db.freestyle(insereEstatisticasClubes)
                                            .finally(() => {
                                                if(indiceTime+1 < timesLength) {
                                                    processaTime(indiceTime+1)
                                                } else {
                                                    fs.writeFile(`erros/estatisticas_jogadores_${campeonato.bet365_season}_${time._id}.json`,JSON.stringify(erros), () => {
                                                        if(indiceCampeonato+1 < campeonatosLength) {
                                                            processaCampeonato(indiceCampeonato+1)
                                                        } else {
                                                            if(indicePais+1 < paisesLength) {
                                                                processaCampeonatosPais(indicePais+1)
                                                            } else {
                                                                console.log('PRONTO!!')
                                                            }
                                                        }
                                                    })
                                                }
                                            })
                                    } else {
                                        console.log('erro');
                                        console.log(campeonato.nome);
                                        console.log(time.name);

                                        console.log(jogadores_estatisticas);

                                        if(indiceTime+1 < timesLength) {
                                            processaTime(indiceTime+1)
                                        }                                        
                                    }
                                })
            
                            })
                        }
            
                        processaTime(0)
                    })
                }
                processaCampeonato(0)
            })
    }

    processaCampeonatosPais(3);
})