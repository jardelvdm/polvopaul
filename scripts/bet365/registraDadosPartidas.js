const fs = require('fs');
const { detalhesPartida } = require('./bet365');
const models = require('./models'),
      bet365 = require('./bet365'),
      db = require('../db');

db.connect().then(() => {
    let query;

    db.partidas.lista().then(partidas => {
        let partidasLength = partidas.length;

        function registraJogadoresPartida (partida,detalhesPartida) {
            return new Promise((resolve,reject) => {
                try {
                    let keys = null;
    
                    let todosJogadoresPartida = [
                        ...detalhesPartida.lineup.home.players.map(p => p.player._id),
                        ...detalhesPartida.lineup.home.substitutes.map(p => p.player._id),
                        ...detalhesPartida.lineup.away.players.map(p => p.player._id),
                        ...detalhesPartida.lineup.away.substitutes.map(p => p.player._id)
                    ]
        
                    db.jogadores.porPartidaUsandoListaComoReferencia(todosJogadoresPartida).then(jogadoresClubePartida => {
                        let jogadoresParaRegistrar = [];
        
                        jogadoresParaRegistrar.push(...
                            detalhesPartida.lineup.home.players.map(jogador => 
                                models.modelJogadorPartida(jogador,partida.id,true,true,jogadoresClubePartida.find(jcp => jcp.bet365 == jogador.player._id))
                            )
                        )
                        jogadoresParaRegistrar.push(...
                            detalhesPartida.lineup.home.substitutes.map(jogador => 
                                models.modelJogadorPartida(jogador,partida.id,true,false,jogadoresClubePartida.find(jcp => jcp.bet365 == jogador.player._id))
                            )
                        )
                        jogadoresParaRegistrar.push(...
                            detalhesPartida.lineup.away.players.map(jogador => 
                                models.modelJogadorPartida(jogador,partida.id,false,true,jogadoresClubePartida.find(jcp => jcp.bet365 == jogador.player._id))
                            )
                        )
                        jogadoresParaRegistrar.push(...
                            detalhesPartida.lineup.away.substitutes.map(jogador => 
                                models.modelJogadorPartida(jogador,partida.id,false,false,jogadoresClubePartida.find(jcp => jcp.bet365 == jogador.player._id))
                            )
                        )
        
                        if(!keys){
                            keys = Object.keys(jogadoresParaRegistrar[0]).join(',');
                        }
        
                        db.freestyle(
                            `INSERT INTO jogadores_partida (${keys})
                            VALUES ${jogadoresParaRegistrar.filter(j => j.jogador_clube).map(jogadorClubePartida => `(${Object.values(jogadorClubePartida).join(',')})`)}`
                        )
                        .then((res) => resolve(res))
                        .catch((res) => {
                            fs.writeFile(`errors/registraJogadoresPartida_${partida.id}.json`,JSON.stringify(res),() => {
                                reject(res)
                            })
                        })
                    })            
                } catch(e){
                    fs.writeFile(`errors/registraJogadoresPartida_${partida.id}.json`,JSON.stringify(e),() => {
                        reject(e)
                    })
                }
            })
        }

        function registraEventosPartida (partida,detalhesPartida) {
            return new Promise((resolve,reject) => {
                try {
                    if(detalhesPartida.timeline.events) {
                        const eventos = detalhesPartida.timeline.events.map(evento => models.modelEventosPartida(partida.id,evento));
                        const keys = Object.keys(eventos[0]).join(',');
    
                        db.freestyle(
                            `INSERT INTO eventos_partida (${keys}) 
                            VALUES ${eventos.map(evento => `(${Object.values(evento).join(',')})`)}`
                        )
                        .then((res) => resolve(res))
                        .catch((res) => {
                            fs.writeFile(`errors/registraEventosPartida_${partida.id}.json`,JSON.stringify(res),() => {
                                reject(res)
                            })
                        })
                    } else (
                        reject()
                    )
                } catch (e) {
                    fs.writeFile(`errors/registraEventosPartida${partida.id}.json`,JSON.stringify(e),() => {
                        reject(e)
                    })
                }
            })
        }

        function registraDadosPartida (indicePartida) {
            const partida = partidas[indicePartida];
            // const partida = partidas.find(p => p.bet365 == 23204403);
            console.log('nova partida',partida.bet365,' - ',indicePartida,'de',partidasLength)

            bet365.detalhesPartida(null,partida.bet365).then(detalhesPartida => {
                Promise.all([
                    registraEventosPartida(partida,detalhesPartida),
                    registraJogadoresPartida(partida,detalhesPartida)
                ])
                .finally(() => {
                    if(indicePartida+1 < partidasLength){
                        registraDadosPartida(indicePartida+1)
                    } else {
                        console.log('PRONTO')
                    }
                })
            })
        }
        registraDadosPartida(0)
    })
})