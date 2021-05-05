const models = require('./models'),
      bet365 = require('./bet365'),
      db = require('../db');

db.connect().then(() => {
    db.freestyle(`SELECT * FROM paises`).then(paises => {
        console.log(paises);

        paises.forEach(pais => {
            db.freestyle(`UPDATE jogadores SET jogadores.nationality = (SELECT id FROM paises WHERE paises.nome = '${pais.nome}' LIMIT 1)
            WHERE jogadores.nationality = '${pais.nome}'`)
        });
    })

})