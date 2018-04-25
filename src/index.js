
// https://medium.com/data-scraper-tips-tricks/scraping-data-with-javascript-in-3-minutes-8a7cf8275b31

document.getElementById('search-btn').addEventListener('click', () => {
    let searchers = remote.require('./src/lib/js/scrapers.js')
    searchers.DuckDuckGo(document.getElementById('target').value)
    while(!searchers.Resultados.DuckDuckGo);
    console.log(searchers.Resultados)
})
