const fs = require('fs');
const models = require('./models'),
      API = require('./api'),
      db = require('../db');

db.connect().then(() => {
    let query;

    let idCampeonato = 834;
    db.campeonato(idCampeonato).then(campeonatos => {
        let keys = null;

        console.log('campeonatos',campeonatos.length)
        
        function inserePartidasTemporada (indiceCampeonatos) {
            console.log('inserePartidasTemporada',indiceCampeonatos)
            const campeonato = campeonatos[indiceCampeonatos];
            API.partidasTemporada(campeonato.bet365_season).then(partidas => {  
                let listaPartidas = partidas.map(partida => models.modelPartidas(partida,idCampeonato));
                let partidasLength = listaPartidas.length;

                if(!keys){
                    keys = Object.keys(listaPartidas[0]);
                }

                function inserePartida (indicePartida) {
                    let partida = listaPartidas[indicePartida];
                    db.freestyle(
                        `INSERT INTO partida (${keys}) VALUES (${Object.values(partida).join(',')})`
                    )
                    .then(() => {
                        if(indicePartida+1 < partidasLength) {
                            inserePartida(indicePartida+1)
                        } else {
                            console.log('pronto')
                        }
                    })
                }

                inserePartida(0);
            }).catch(erro => {
                console.log('erro',erro)
                fs.writeFile(`erros/partidas_${campeonato.bet365_season}.json`, JSON.stringify(erro), () => {});
            })
        };

        inserePartidasTemporada(0)
    })
})