// manipular o banco de dados
let connection;

const db = {
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
    freestyle: queryString => new Promise((resolve,reject) => {
        connection.query(queryString, function (error, result, fields) {
            if(error) reject(error)

            resolve(result);
        })
    }),
    paisPorNome: nomePais => new Promise(resolve => {
        connection.query(`SELECT * FROM paises WHERE nome LIKE "${nomePais}" LIMIT 1`, function (error, pais, fields) {
            if(error) reject(error)

            resolve(pais);
        })
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
    }),
    registraClube: (clube) => new Promise((resolve,reject) => {
        let keys = Object.keys(clube);
        console.log('>>',`INSERT INTO clubes (${keys}) VALUES (${Object.values(clube).join(',')})`)
        connection.query(`INSERT INTO clubes (${keys}) VALUES (${Object.values(clube).join(',')})`, function (error, registroClube_result, fields) {
            if(error) reject(error)

            resolve(registroClube_result);
        })  
    }),
    registraVariosClubes: (lista) => new Promise((resolve,reject) => {
        let keys = Object.keys(lista[0]);
        connection.query(`INSERT INTO clubes (${keys}) VALUES ${lista.map(clube => `(${Object.values(clube).join(',')})`).join(',')}`, function (error, registroVariosClubes_result, fields) {
            if(error) reject(error)

            resolve(registroVariosClubes_result);
        })  
    }),
    registraJogador: (jogador) => new Promise((resolve,reject) => {
        let keys = Object.keys(jogador);
        connection.query(`INSERT INTO jogadores (${keys}) VALUES (${Object.values(jogador).join(',')})`, function (error, registroJogador_result, fields) {
            if(error) reject(error)

            resolve(registroJogador_result);
        })  
    }),
    registraVariosJogadores: (lista) => new Promise((resolve,reject) => {
        let keys = Object.keys(lista[0]);
        connection.query(`INSERT INTO jogadores (${keys}) VALUES ${lista.map(jogador => `(${Object.values(jogador).join(',')})`).join(',')}`, function (error, registroVariosJogadores_result, fields) {
            if(error) reject(error)

            resolve(registroVariosJogadores_result);
        })  
    }),
    registraJogadorClube: (jogador_id,clube_id) => new Promise((resolve,reject) => {
        connection.query(`INSERT INTO jogadores_clube (jogador_id,clube_id) VALUES (${jogador_id},${clube_id})`, function (error, registroJogadorClube_result, fields) {
            if(error) reject(error)

            resolve(registroJogadorClube_result);
        })  
    }),
    registraVariosJogadoresClube: (jogadoresLista,clube_id) => new Promise((resolve,reject) => {
        connection.query(`INSERT INTO jogadores_clube (jogador_id,clube_id) VALUES (${jogadoresLista.map(jc => `(${jc},${clube_id})`).join(',')}`, function (error, registroJogadoresClube_result, fields) {
            if(error) reject(error)

            resolve(registroJogadoresClube_result);
        })  
    }),
    timesPais: paisNome => new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM paises INNER JOIN clubes ON clubes.country = paises.id WHERE paises.nome = "${paisNome}"`, function (error, registroJogadoresClube_result, fields) {
            if(error) reject(error)

            resolve(registroJogadoresClube_result);
        })  
    }),
    partidas: {
        lista: () => new Promise((resolve,reject) => {
            db.freestyle(`SELECT * FROM partida`)
                .then(partidas => resolve(partidas))
                .catch(erro => reject(erro))
        }),
        porPais: (idPais) => {

        },
        porCampeonato: (idCampeonato) => {

        },
        porClube: (idClube) => {

        },
        detalhes: (idPartida) => {

        }
    },
    jogadores: {
        lista: () => new Promise((resolve,reject) => {
            db.freestyle(`SELECT * FROM jogadores`)
                .then(jogadores => resolve(jogadores))
                .catch(erro => reject(erro))
        }),
        porPais: (idPais) => {

        },
        porCampeonato: (idCampeonato) => {

        },
        porClube: (idPartida) => {

        },
        porPartida: () => new Promise((resolve,reject) => {

        }),
        porPartidaUsandoListaComoReferencia: (todosJogadoresPartida) => new Promise((resolve,reject) => {
            const queryJogadoresPartida = `
                SELECT jogadores.bet365, jogadores_clube.id as jcid FROM jogadores 
                INNER JOIN jogadores_clube ON jogadores_clube.jogador_id = jogadores.id
                WHERE ${todosJogadoresPartida.map(jogador => `jogadores.bet365 = ${jogador}`).join(' OR ')}
                GROUP BY jogadores.bet365`

            db.freestyle(queryJogadoresPartida)
                .then(jogadoresClubePartida => resolve(jogadoresClubePartida))
                .then(erro => reject(erro))
        })
    }
    // registrar os jogadores dos times
    // registrar as partidas de todos os times
    // registrar os jogadores de cada partida
}

module.exports = db;