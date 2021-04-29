// rodar isso no console (ou puppeteer)
// [detalhes do time] https://s5.sir.sportradar.com/bet365/br/1/season/77283/team/2953

const insereMomentJS = () => {
    // adiciona o momentjs pra manipular a data de nascimento do jogador

    var my_awesome_script = document.createElement('script');
    my_awesome_script.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js');
    document.head.appendChild(my_awesome_script);
}

const pegaJogadoresNivelSuperficial = () => {
    // funciona apenas na pagina de detalhes do time
    // pega o painel 'Equipe Atual', faz um parse na tabela e retorna os valores das celulas (sem estatisticas)
    const teamContainer = document.querySelector("#sr-container > div > div > div.container.container-main.contair-full-height-flex-auto > div > div > div > div > div:nth-child(4)");
    let listaJogadores = Array.from(teamContainer.querySelectorAll('.cursor-pointer'))
            .map(tr => Array.from(tr.childNodes).filter((i,idx)=> [0,1,3,4].includes(idx))
            .map(i => i.textContent))
    
    // copia a lista dos jogadores e prepara os inserts do banco
    let team = 18 // id do time no banco
    // se quiser mandar um post pra um endpoint receber esses valores tbm rola mas pra prototipo nao fiz

    copy(
        listaJogadores.map(row => `
            INSERT INTO jogadores 
                (posicao, numero, nome, nascimento) VALUES 
                ('${row[0]}', ${row[1] || 0}, '${row[2]}', '${moment(row[3],'DD MM YY').format('YYYY-MM-DD')}');
            INSERT INTO jogadores_clube 
                (jogador_id, clube_id) VALUES
                (LAST_INSERT_ID(),${team})
        `).join(';')
    )
}

const pegaIdBET365jogadores = () => {
    // manualmente pega os ids dos jogadores no bet365
        // ir na pagina [detalhes do time] e colar no console
        // essa função cria um watcher pra cuidar a url
        // quando a url muda e identificamos a palavra `player` no endpoint ele pega o nome do jogador (no dom) e o id dele (na url)
    // after the last one, get the array of ids in the variable a
    // also correlate with the player name in order to set an update to him

    let ids = []
    let jogadoresNomes = []
    let falhas = []

    const intervaloTimerMS = 1;
    
    setInterval(() => {
        let location = window.location.href.split('/').reverse();
        let paginaDetalhesJogador = location.includes('player');
        let jogadorID = location[0];
    
        // essa verificação rola pq o intervalo é muito curto e sem ela o mesmo id ia ser inserido um monte de vezes no array
        if(paginaDetalhesJogador && !ids.includes(jogadorID)) {
            ids.push(jogadorID)    
        }
    
        try {
            let seletor = "#sr-container > div > div > div.container.container-main.contair-full-height-flex-auto > div > div > div > div:nth-child(1) > div.panel.margin-bottom > div > div:nth-child(2) > div > div > div > div.row.margin-bottom > div > div.row > div:nth-child(2) > div > div.hidden-xs-up.visible-sm-up > div > div.col-xs.flex-xs-no-grow.wrap > strong";
            let jogadorNome = document.querySelector(seletor).innerText;
    
            if(paginaDetalhesJogador && !jogadoresNomes.includes(jogadorNome)) {
                console.log('pronto')
                jogadoresNomes.push(jogadorNome)
            }
        } catch(e){
            console.log('nao rolou')
            falhas.push(jogadorID)
        }
    },intervaloTimerMS)
}

function parser(x){
    // o parser pega o conteudo da tabela e clica em um por um da lista
        // não achei nenhuma referência ao id do jogador sem ter que clicar nele, mas tbm não cavoquei muito as variaveis
    // como o bet365 é um SPA o script persiste na memoria e ai rola de boas
    
    // guarda a lista de items numa variavel (chamo aqui de novo pq a medida que o a pagina vai e volta ele perde a referencia entao achei melhor salvar em cada iteracao)
    let teamContainer = document.querySelector("#sr-container > div > div > div.container.container-main.contair-full-height-flex-auto > div > div > div > div > div:nth-child(4)");
    let items = Array.from(teamContainer.querySelectorAll('.cursor-pointer')); // seleciona so os itens que sao clicaveis na tabela
    
    // e clica no item correspondente ao indice recebido no parametro do parser()
    let item = items[x];
    item.click();

    console.log('>>',item.innerText)

    // nesse momento a pagina de detalhes do jogador vai ser carregada
    // entao espera um segundinho e meio ate que ela de fato esteja pronta

    // (nesse meio tempo o watcher da funcao `pegaIdBET365jogadores` vai pegar o id no bet365 e nome do jogador)
    // depois que a pagina estiver carregada apenas precisa voltar pros detalhes do time
    // ai espera um segundo a mais pra carregar tudo e chama o parser pra iterar no proximo jogador da lista

    // no final gera um update da tabela de jogadores pra adicionar o id deles no bet365 e usa o nome do cara como ref do WHERE
    
    // se quiser mandar um post pra um endpoint receber esses valores tbm rola mas pra prototipo nao fiz
    setTimeout(() => {
        window.history.back();

        setTimeout(() => {
            if(x+1 < items.length) {
                parser(x+1)
            } else {
                alert('pronto')
                copy(ids.map((id,idx) => `UPDATE jogadores SET bet365 = '${id}' WHERE bet365 IS NULL AND nome = '${jogadores[idx]}'`).join(';'))
            }
        },1000)
    },1500)
}

Promise.all([
    insereMomentJS,
    pegaJogadoresNivelSuperficial,
    pegaIdBET365jogadores
]).then(() => parser(0))