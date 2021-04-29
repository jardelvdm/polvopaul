// rodar isso no console (ou puppeteer)
// [detalhes do jogo] https://s5.sir.sportradar.com/bet365/br/1/season/77283/gamecast/23002319 

const painelEventos = document.querySelector('.common').querySelectorAll('.col-xs-12.col-sm-6')[0] // pega o elemnto da coluna 1 (com a lista de eventos) 
const eventos = painelEventos.querySelectorAll('.cursor-pointer') // vai retornar as linhas da tabela
const gamecastID = document.location.pathname.split('/').reverse()[0];

Array.from(eventos).map(linhaEvento => {
    let tds = linhaEvento.children // vai retornar as celulas da linha

    let time = tds[0].innerHTML.length ? 0 : 1 // se o td[1] tiver valor, é ação do time da casa, se não não
    let celulaCorreta = time * 2; // retorna 0 ou 2, uma vez que a célulaa do meio só tem o momento da ação 
    let actionData = tds[celulaCorreta].querySelectorAll('.col-xs')[1].children // conteudo da celula
    
    let jogador = actionData[0].innerText // pega apenas o conteudo destacado da celula (pode conter o nome do jogador executor da ação + nome de algum jogador auxiliar (quem pifou ele ou foi substituido))

    let gol = jogador.includes(':') // o bet 365 bota o placar quando anuncia o gol, entao se tiver o : significa que o valor é 1:0, 1:1...
    let troca = !gol && !!actionData[1] // se não foi um gol tem na célula o nome de um segunod jogador

    let tipoEvento;

    if(gol) {
        tipoEvento = 'gol'
    } else if (troca) {
        tipoEvento = 'troca'
    } else {
        tipoEvento = 'cartao'
    }

    let minuto = parseInt(tds[1].querySelector('.graphics-text-on-branding-fill p').innerText);

    let o = {
        time: time == 0 ? 'home' : 'away',
        tipoEvento: tipoEvento,
        minuto: minuto,
        jogador: jogador,
        gamecast: gamecastID
    }

    return o;
})