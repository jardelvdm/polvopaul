-- problemas
-- jogadores duplicados
-- registros jogadores_clubes para os jogadores duplicados
-- jogadores belgas faltando
-- um jogador nao inserido em jogadores_clubes
-- um clube faltando na turquia: Denizlispor


-- todos os jogadores repetidos
SELECT jogadores.nome, clubes.nome, clubes.país, COUNT(*) 
FROM jogadores 
INNER JOIN jogadores_clube 
INNER JOIN clubes 
WHERE jogadores.id = jogadores_clube.jogador_id AND jogadores_clube.clube_id = clubes.ID 
GROUP BY jogadores.nome 
HAVING COUNT(*) > 1

-- jogadores repetidos por time
SELECT * FROM `jogadores_clube` 
INNER JOIN jogadores 
INNER JOIN clubes 
WHERE jogadores.id = jogadores_clube.jogador_id AND jogadores_clube.clube_id = clubes.ID AND clube_id = 35

-- jogadores de algum pais
SELECT * FROM `clubes` as `c`
INNER JOIN `jogadores_clube` as `jc`
INNER JOIN `jogadores` as `j`
WHERE j.id = jc.jogador_id AND jc.clube_id = c.ID AND c.país = "Inglaterra"

-- dados de jogadores pra tentar encontrar correlações com os dados do fida 
SELECT `jogadores`.`nome`,`jogadores`.`posicao`, `jogadores_clube`.`jogador_id`, `clubes`.`mediumname`, `clubes`.`país` 
FROM `jogadores` 
INNER JOIN jogadores_clube ON jogadores_clube.jogador_id = jogadores.id 
INNER JOIN clubes ON jogadores_clube.clube_id = clubes.id