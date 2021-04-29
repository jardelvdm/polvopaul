// rodar isso no console (ou puppeteer)
// [detalhes do jogo] https://s5.sir.sportradar.com/bet365/br/1/season/77283/gamecast/23002319 

const painelEstatisticas = document.querySelector('.common').querySelectorAll('.col-xs-12.col-sm-6')[1] // pega o elemnto da coluna 2 (com a lista de estatisticas) 
const estatisticas = painelEstatisticas.querySelectorAll('.panel-body > .row');
const gamecastID = document.location.pathname.split('/').reverse()[0];

Array.from(estatisticas)
.filter((i,idx) => idx > 0) // ignora posse de bola pq a estrutura html é diferente
.map(row => {
    let o = {
        param: row.querySelector('.text-uppercase').innerText,
        time1: parseInt(row.querySelector('.graphics-text-primary-color').innerText),
        time2: parseInt(row.querySelector('.graphics-text-secondary-color').innerText),
        gamecast: gamecastID
    } 

    return o
})