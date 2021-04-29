query = (idTime,idTemporada) => fetch(`https://stats.fn.sportradar.com/bet365/br/Europe:London/gismo/stats_teamplayer_facts/${idTime}/${idTemporada}`);

var ctrlc = copy;

query(2953,77283)
    .then(res => res.json())
    .then(res => {
        console.log(Object.values(res.doc[0].data).map(data => [data.stats.playerid, data.stats.total]))
    })