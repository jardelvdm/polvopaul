const db = require('./db');

module.exports = {
    get: clubeMediumName => new Promise((resolve,reject) => {
        db.connect().then(() => {
            let results = {};
            const query_clube = `SELECT * FROM clubes WHERE name LIKE '${clubeMediumName}'`;

            db.freestyle(query_clube).then(c => {
                const clube = c[0];
                let clubeID = clube.id;
                results.clube = clube;

                let idsRelacionados = c.map(clube => clube.id)

                const query_desempenhoClube = `SELECT * FROM desempenho_clube WHERE desempenho_clube.clube = ${idsRelacionados.map(id => id).join(' OR desempenho_clube.clube = ')} LIMIT 1`;
                db.freestyle(query_desempenhoClube).then(desempenho_clube => {
                    results.desempenho_clube = desempenho_clube[0];
                    
                    const query_estatisticas_jogadores = `
                        SELECT jogadores.nome,jogadores.posicao,jogadores.height,jogadores.weight,jogadores_estatisticas.* FROM jogadores_clube
                        INNER JOIN jogadores ON jogadores.id = jogadores_clube.jogador_id
                        INNER JOIN jogadores_estatisticas ON jogadores_estatisticas.jogador_clube = jogadores_clube.id
                        WHERE jogadores_clube.clube_id = ${idsRelacionados.map(id => id).join(' OR jogadores_clube.clube_id = ')}
                        GROUP BY jogadores.bet365
                    `;
                    db.freestyle(query_estatisticas_jogadores).then(estatisticas_jogadores => {
                        results.estatisticas_jogadores = estatisticas_jogadores;

                        const query_eventos_partidas = `
                            SELECT eventos_partida.typeid, eventos_partida.type, eventos_partida.time, eventos_partida.seconds, eventos_partida.name, eventos_partida.team FROM clubes 
                            INNER JOIN partida ON partida.home_id = clubes.id
                            INNER JOIN eventos_partida ON eventos_partida.partida = partida.id
                            WHERE clubes.id = ${clubeID}
                        `;
                        db.freestyle(query_eventos_partidas).then(eventos_partidas => {
                            results.eventos_partidas = eventos_partidas;
    
                            const query_over_under = `
                                SELECT overunder_clube.* FROM overunder_clube 
                                INNER JOIN clubes ON clubes.id = overunder_clube.clube 
                                WHERE overunder_clube.clube = ${clubeID}
                            `;
                            db.freestyle(query_over_under).then(over_under => {
                                results.over_under = over_under;
                            
                                resolve(results)
                            }).catch(error => reject(error));
                        }).catch(error => reject(error));
                    }).catch(error => reject(error));
                }).catch(error => reject(error));
            }).catch(error => reject(error));
        })
    })
}