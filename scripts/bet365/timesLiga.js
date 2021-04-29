// rodar isso no console (ou puppeteer)
// [detalhes da liga] https://s5.sir.sportradar.com/bet365/br/1/season/77189

// na pagina de detalhes da liga, itera sobre os itens da tabela de classificação
// cada time vira um item no array, o parser clica na linha do time e vai até a página de [detalhes do time]
    // na página de detalhes do time, pega o nome e o id do time no bet365
    // AQUI, ele deve rodar o script do squad.js, pra iterar sobre os jogadores da tabela, ir ate a pagina de detalhes de cada um e pegar seus dados
        // nao fiz isso pq tava rodando tudo no console, entao eh uma funcao copiada de la que nao foi totalmente ajustada
    // quando pega o ultimo jogador da tabela, volta ate a pagina de detalhes do time
    // vai tentar pegar o proximo jogador e quando rolar o `catch` vai fazer um history.back() e voltar pra pagina de detalhes da liga
    // depois de um segundo, chama a função pra pegar os dados do próximo time

    // no final, estrutura o codigo e gera os SQL pra inserir os times, os jogadores e a relação jogador -> time

let times = []
function getTimesAndJogadores (indexTime){
    let item = Array.from(document.querySelector('.sub-container.common > .row').querySelectorAll('tr .text-left.cursor-pointer .hidden-xs-up.visible-sm-up.wrap')).filter((i,idx) => idx<20)[indexTime];
        item.click()

    setTimeout(() => {
        let time = {
            nome: document.querySelector('.hidden-xs-up.visible-sm-up.size-xxl').innerText,
            bet365: window.location.pathname.split('/').reverse()[0]
        };

        times.push(time);

        // squad.js
        const teamContainer = document.querySelector("#sr-container > div > div > div.container.container-main.contair-full-height-flex-auto > div > div > div > div > div:nth-child(4)");
        time.jogadores = Array.from(teamContainer.querySelectorAll('.cursor-pointer'))
                        .map(tr => Array.from(tr.childNodes).filter((i,idx)=> [0,1,3,4].includes(idx))
                        .map(i => i.textContent))
        let jogadorAtual = 0;

        let getJogadoresInterval = setInterval(() => {
            let location = window.location.href.split('/').reverse()
        
            if(location.includes('player') && !time.jogadores[jogadorAtual].includes(location[0])) {
                time.jogadores[jogadorAtual].push(location[0])
            }
        },10)

        function parser(x){
            let teamContainer = document.querySelector("#sr-container > div > div > div.container.container-main.contair-full-height-flex-auto > div > div > div > div > div:nth-child(4)");
            let items = Array.from(teamContainer.querySelectorAll('.cursor-pointer'));
            let item = items[x];
            try {
                item.click();
            
                jogadorAtual = x;
    
                console.log('>>',item.innerText)
            
                setTimeout(() => {
                    window.history.back();
            
                    setTimeout(() => {
                        if(x+1 <= items.length)
                            parser(x+1)
                    },1000)
                },1500)
            } catch(e){
                setTimeout(() => {       
                    window.history.back();
                    setTimeout(() => {
                        clearInterval(getJogadoresInterval)

                        console.log('times >>>>',times)
                        getTimesAndJogadores(indexTime+1)
                    },1000)
                },1000)
            }
        }
        parser(0)
        // squad.js
    },10000)
}

getTimesAndJogadores(0)

// INSERT INTO clubes
const pais = "Holanda"
copy(times.map(time => `INSERT INTO clubes (nome,bet365,país) VALUES ("${time.nome}","${time.bet365}","${pais}")`).join(';'))

copy(times.map(time => {
    return time.jogadores
                .map(jogador => 
        `INSERT INTO jogadores (posicao, numero, nome, nascimento,bet365) VALUES ("${jogador[0]}", ${jogador[1] || 0}, "${jogador[2]}", "${moment(jogador[3],'DD MM YY').format('YYYY-MM-DD')}","${jogador[4]}");
        INSERT INTO jogadores_clube (jogador_id, clube_id) VALUES (LAST_INSERT_ID(),(SELECT id FROM clubes WHERE nome = "${time.nome}"))`
    )
}).reduce((a,b) => a.concat(b)).join(';'))