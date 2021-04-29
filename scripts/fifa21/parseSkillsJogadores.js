// pra tentar preencher uma tabela de skills dos jogadores
// peguei dados do fifa21 (mas so achei os top 1000 a partir desse site aqui: https://www.ea.com/en-gb/games/fifa/fifa-21/ratings/ratings-database/player-name/Lionel%20Messi/158023)

let fifaRatings;
let jogadores;
let skills = ["acceleration","aggression","agility","balance","ballcontrol","composure","crossing","curve","def","dribbling","finishing","freekickaccuracy","headingaccuracy","interceptions","jumping","longpassing","longshots","marking","pac","pas","penalties","phy","positioning","reactions","sho","shortpassing","shotpower","slidingtackle","sprintspeed","stamina","standingtackle","strength","vision","volleys"];

fetch(`https://ratings-api.ea.com/v2/entities/fifa-21?filter=&sort=ranking:ASC&limit=1000&offset=0`)
    .then(res => res.json())
    .then(res => fifaRatings = res)

todosJogadoresDB = `
    SELECT j.nome, j.posicao, jc.id as jogador_clube_id, jc.jogador_id, c.mediumname, c.país FROM jogadores as j
    INNER JOIN jogadores_clube AS jc ON jc.jogador_id = j.id
    INNER JOIN clubes AS c ON jc.clube_id = c.id
`;
apenasJogadoresSemEstatisticas = `
    ${todosJogadoresDB}
    INNER JOIN jogadores_estatisticas AS s 
    WHERE NOT EXISTS (select * from jogadores_estatisticas where jogador_clube = jc.id)
`;

fetch(`NODEJSAPI(apenasJogadoresSemEstatisticas)`)
    .then(res => res.json())
    .then(res => jogadores = res)


// associa o jogador do banco de dados com os dados dele do fifa
// MAAAAS: 
    // 1 - esse script não pega os jogadores com variação do nome, então ele funciona pra 'lionel messi',
        // pois o nome do cara tá 'Messi' no fifa e 'Messi, Lionel' no bet365, então funciona pra quando não tem muita variação lingústica
    fifaratings.map(fr => {
        fr.jogador = jogadores.find(jogador => 
            [fr.playerjerseyname].some(namePart => jogador.nome.includes(fr.playerjerseyname) || jogador.nome.replace(',','').split(' ').includes(namePart))
        )

        return fr;
    })
    // 2 - aqui, o script fica mais complexo pq precisa entender as variações lingústicas nos nomes (sérgio ramos (no fifa) vs sergio ramos (no bet365))
    // e nomes encurtados (Müller (no fifa) vs Thomas Muller (no bet365))
    // ele faz o filtro com o nome sem caracteres especiais, mas tbm transforma os pedaços do nome em um array pra comparar os que são semelhantes entre ambas bases de dados 
    // pra não gerar uma lista gigante de correlações, adicionei mais um filtro que além do nome do jogador
    // o nome do time também precisa ser similar em algum aspecto
    fixName = (name) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    arrayPossibilidades = (fr) => [fixName(fr.surname),fixName(fr.firstname),fixName(fr.commonname),fixName(fr.playerjerseyname)];
    filtraJogadoresDBVsFifaMultiParam = (fr) => jogadores.filter(jogador => 
        arrayPossibilidades(fr).some(namePart => jogador.nome.includes(fr.playerjerseyname) || fixName(jogador.nome.replace(',','')).split(' ').includes(namePart)) // variações do nome do jogador no fifa são encontradas no nome do jogador no banco de dados
        && fr.teamname.split(' ').some(namePart => jogador.mediumname.split(' ').includes(namePart))
    )

    const listaJogadoresAmplasPossibilidades = fifaratings
        .filter(fr => !fr.jogador) // pega os registros do fifa em que a correlação com o jogador do banco de dados falhou
        .map(fr => [fr, filtraJogadoresDBVsFifaMultiParam(fr)])
    // então no fim, os jogadores armazenados em 'listaJogadoresAmplasPossibilidades' devem ser manualmente correlacionados
    // OU filtrado mais de acordo com outros parametros
    // podemos trazer o numero da camiseta do nosso banco de dados e conferir isso com os resultados do fifa
    // podemos verificar a posição do jogador (fifa e bet365 tem padroes diferentes de definição das posições. fifa especifica RW,LW,etc mas o bet365 apenas AVN)
    // podemos verificar a data de nascimento do jogador
    // etc

// com a lista de jogadores do fifa associada ao jogador que temos no banco,
// ajusta as skills pro formato do banco e gera o script de inserção
fifaratings
    .filter(fr => fr.jogador) // pega só os registros do fifa que tem um jogador do banco atrelado
    .map(j => [j.jogador,skills.map(skill => j[skill])])
    .map(j => `INSERT INTO jogadores_skills (skill_id,jogador_clube,amount)
               VALUES ${j[1].map((value,idx) => `(${idx+1},${j[0].jogador_clube_id},${value})`).join(',')}`)