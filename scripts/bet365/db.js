// manipular o banco de dados
module.exports = {
    connect: () => {
        var mysql      = require('mysql');
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'polvopaul'
        });

        let r = connection.connect();

        return r;
    }
    // registrar os times da liga
    // registrar os jogadores dos times
    // registrar as partidas de todos os times
    // registrar os jogadores de cada partida
}