// rodar isso no console (ou puppeteer)
// [detalhes do jogo] https://s5.sir.sportradar.com/bet365/br/1/season/77283/gamecast/23002319 

const lineupsColumns = document.querySelector("#sr-container > div > div > div.container.container-main.contair-full-height-flex-auto > div > div > div > div:nth-child(4) > div.panel.margin-bottom > div > div")
const tabelas = lineupsColumns.querySelectorAll('table')

// enjambre pra associar os arrays de jogadores com o time mandante ou visitante
// e qual tabela é referente a qual qualificação de jogadores
const time = ['home','home','away','away']
const qualifJogadores = ['titulares','reservas','titulares','reservas']

const dadosJogador = (linhaDadosJogadorTabela) => Array.from(linhaDadosJogadorTabela.querySelectorAll('td'))
                                                        .map(td => td.innerText)
                                                        .filter(v => v) // pega só os valores das células que tem conteudo
                                                        .map((i,idx) => idx % 2 ? parseInt(i) : i) // converte os pares em numero pois sao referentes ao numero da camisa e minutos que jogou

Array.from(tabelas)
    .filter((tabela, idx) => idx < 4) // só as que interessam
    .map((tabela,idxTabela) => 
        [
            time[idxTabela],
            qualifJogadores[idxTabela],
            Array.from(tabela.querySelectorAll('tr.cursor-pointer'))
                .map(tr => dadosJogador(tr))
        ]
    )