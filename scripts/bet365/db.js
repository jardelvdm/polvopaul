// manipular o banco de dados
let connection;
module.exports = {
    connect: () => new Promise(resolve => {
        var mysql      = require('mysql');
        connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'polvopaul'
        });

        connection.connect();

        resolve(connection);
    }),
    campeonatos: () => new Promise((resolve,reject) => {
        connection.query("SELECT * FROM campeonatos WHERE bet365_season IS NOT NULL", function (error, campeonatos, fields) {
            if(error) reject(error)

            resolve(campeonatos);
        })  
    }),
    campeonatosPais: (paisID) => new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM paises INNER JOIN campeonatos ON paises.id = campeonatos.pais WHERE paises.id = ${paisID}`, function (error, campeonatos, fields) {
            if(error) reject(error)

            resolve(campeonatos);
        })  
    }),
    campeonato: (campeonatoID) => new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM campeonatos WHERE campeonatos.id = ${campeonatoID} LIMIT 1`, function (error, campeonatos, fields) {
            if(error) reject(error)

            resolve(campeonatos);
        })  
    })
    // registrar os times da liga
    // registrar os jogadores dos times
    // registrar as partidas de todos os times
    // registrar os jogadores de cada partida
}