const yargs = require('yargs').argv;
const ExcelJS = require('exceljs');
const buscaInfosClube = require('./buscaInfosClube');

function unique(item, pos, self) {
    return self.indexOf(item) == pos;
};

const mandante = yargs.mandante
const visitante = yargs.visitante

let resultsMandante,
    resultsVisitante;

const workbook = new ExcelJS.Workbook();

workbook.creator = '@jardelvdm';
workbook.created = new Date();


buscaInfosClube.get(mandante).then(results => {
    resultsMandante = results;
    
    buscaInfosClube.get(visitante).then(results => {
        resultsVisitante = results;

        const timeColumn = (resultsMandante,resultsVisitante) => ({ header: 'time', key: 'time', width: Math.max(resultsMandante.clube.name.length,resultsVisitante.clube.name.length)+1 });

        // indice
            const indice = workbook.addWorksheet('Indice');

            indice.columns = [
                { header: 'time', key: 'time', width: Math.max('Mandante','Visitante')+1 },
                ... Object.keys(resultsMandante.clube).map(k => {
                    return { header: k, key: k, width: k.length+1 };
                })
            ]

            indice.addRow(['Mandante',...Object.values(resultsMandante.clube)]);
            indice.addRow(['Visitante',...Object.values(resultsVisitante.clube)]);

        // overunder
            const overunder = workbook.addWorksheet('Over vs under', {views:[{state: 'frozen', xSplit: 1, ySplit:1}]});

            overunder.columns = [
                { header: 'metrica', key: 'metrica', width: 40},
                { header: resultsMandante.clube.name, key: 'mandante_nome', width: resultsMandante.clube.name.length + 1},
                { header: resultsVisitante.clube.name, key: 'visitante_nome', width: resultsVisitante.clube.name.length + 1},
            ]

            Object.keys(resultsMandante.over_under[0]).map((k,idx) => {
                overunder.addRow([k,resultsMandante.over_under[0][k],resultsVisitante.over_under[0][k]]);
            })

            // overunder.addRow([resultsMandante.clube.name,...Object.values(resultsMandante.over_under[0])]);
            // overunder.addRow([resultsVisitante.clube.name,...Object.values(resultsVisitante.over_under[0])]);

        // eventos
            const eventos = workbook.addWorksheet('Eventos Partidas', {views:[{state: 'frozen', xSplit: 1, ySplit:1}]});

            const todosTiposDeEventos = [
                ...resultsMandante.eventos_partidas.map(ev => ev.name),
                ...resultsVisitante.eventos_partidas.map(ev => ev.name)
            ].filter(unique)

            eventos.columns = [
                timeColumn(resultsMandante,resultsVisitante),
                ...todosTiposDeEventos.map(k => {
                    return { header: k, key: k, width: k.length+1 };
                })
            ]

            eventos.addRow([resultsMandante.clube.name,...todosTiposDeEventos.map(tipo => resultsMandante.eventos_partidas.filter(ep => ep.name == tipo).length)]);
            eventos.addRow([resultsVisitante.clube.name,...todosTiposDeEventos.map(tipo => resultsVisitante.eventos_partidas.filter(ep => ep.name == tipo).length)]);

        // eventos / minuto
            const eventosMinuto = workbook.addWorksheet('Eventos x Minuto', {views:[{state: 'frozen', xSplit: 1, ySplit:1}]});

            const timeRange = [-5,90],
                  minutos = [],
                  min = timeRange[0],
                  max = timeRange[1];
            let minuto = min;

            while(minuto <= max){
                minutos.push(minuto)
                minuto += 1;
            }

            eventosMinuto.columns = [
                { header: 'tipo de evento', key: 'tipo de evento', width: Math.max(...todosTiposDeEventos.map(i => i.length)) },
                ...minutos.map(minuto => ({ header: minuto, key: 'minuto', width: 4 }))
            ];

            // identifica o time mandante e pra cada tipo de evento, gera uma nova linha.
            // cada celula de coluna vai receber a contagem de eventos daquele tipo que acontecem naquele minuto
            eventosMinuto.addRow([resultsMandante.clube.name,...minutos.map(minuto => "===")]);
            todosTiposDeEventos.forEach(tipoEvento => {
                let eventosPorTipo = resultsMandante.eventos_partidas.filter(evento => evento.name == tipoEvento)
                eventosMinuto.addRow([tipoEvento,...minutos.map(minuto => eventosPorTipo.filter(evento => parseInt(evento.time) == minuto).length)])
            })

            // identifica o time visitante e pra cada tipo de evento, gera uma nova linha.
            // cada celula de coluna vai receber a contagem de eventos daquele tipo que acontecem naquele minuto
            eventosMinuto.addRow([resultsVisitante.clube.name,...minutos.map(() => "===")]);
            todosTiposDeEventos.forEach(tipoEvento => {
                let eventosPorTipo = resultsVisitante.eventos_partidas.filter(evento => evento.name == tipoEvento)
                eventosMinuto.addRow([tipoEvento,...minutos.map(minuto => eventosPorTipo.filter(evento => parseInt(evento.time) == minuto).length)])
            })

        // eventos por periodo
            const eventosPeriodo = workbook.addWorksheet('Eventos x Periodo', {views:[{state: 'frozen', xSplit: 1, ySplit:2}]});

            let offset = 15,
                minutosEmJogo = minutos.filter(minuto => minuto > 0),
                gruposDeMinutos = minutosEmJogo.length / offset,
                iterations = 0,
                periodos = [];

            for (iterations; iterations <= gruposDeMinutos; iterations++) {
                const offsetSliceFrom = iterations * offset;
                    offsetSliceTo = (iterations + 1) * offset;
                
                
                periodos.push(minutosEmJogo.slice(offsetSliceFrom, offsetSliceTo))
            }

            eventosPeriodo.columns = [
                { header: '-', key: '-', width: 25}
            ]

            const colunasPeriodos = periodos.filter(periodo => periodo.length).map(periodo => `${periodo[0]} a ${periodo[periodo.length-1]}`)
            eventosPeriodo.addRow([resultsMandante.clube.name,...colunasPeriodos,'',resultsVisitante.clube.name,...colunasPeriodos]);
            todosTiposDeEventos.forEach(tipoEvento => {
                let eventosPorTipoMandante = resultsMandante.eventos_partidas.filter(evento => evento.name == tipoEvento)
                let eventosPorTipoVisitante = resultsVisitante.eventos_partidas.filter(evento => evento.name == tipoEvento)
                eventosPeriodo.addRow([
                    tipoEvento,
                    ...periodos.filter(periodo => periodo.length).map(periodo => eventosPorTipoMandante.filter(evento => periodo.includes(evento.time)).length),
                    '',
                    '',
                    ...periodos.filter(periodo => periodo.length).map(periodo => eventosPorTipoVisitante.filter(evento => periodo.includes(evento.time)).length)])
            })
            
        // desempenho
            const desempenho = workbook.addWorksheet('Desempenho Clubes', {views:[{state: 'frozen', xSplit: 1, ySplit:1}]});

            desempenho.columns = [
                { header: 'metrica', key: 'metrica', width: 25},
                { header: resultsMandante.clube.name, key: 'mandante_nome', width: resultsMandante.clube.name.length + 1},
                { header: resultsVisitante.clube.name, key: 'visitante_nome', width: resultsVisitante.clube.name.length + 1},
            ]

            Object.keys(resultsMandante.desempenho_clube).map((k,idx) => {
                desempenho.addRow([k,resultsMandante.desempenho_clube[k],resultsVisitante.desempenho_clube[k],]);
            })

        // estatisticas jogadores
            const estatisticas_jogadores = workbook.addWorksheet('Estatisticas Jogadores', {views:[{state: 'frozen', xSplit: 2, ySplit:1}]});

            estatisticas_jogadores.columns = [
                timeColumn(resultsMandante,resultsVisitante),
                ... Object.keys(resultsMandante.estatisticas_jogadores[0]).map(k => {
                    return { header: k, key: k, width: Math.max(k.length, String(resultsMandante.estatisticas_jogadores[0][k]).length) + 1 };
                })
            ]

            resultsMandante.estatisticas_jogadores.forEach(ej => {
                estatisticas_jogadores.addRow([resultsMandante.clube.name,...Object.values(ej)]);
            })

            resultsVisitante.estatisticas_jogadores.forEach(ej => {
                estatisticas_jogadores.addRow([resultsVisitante.clube.name,...Object.values(ej)]);
            })

        workbook.xlsx.writeFile(`./analise_${resultsMandante.clube.abbr}_vs_${resultsVisitante.clube.abbr}.xlsx`);
    })
})