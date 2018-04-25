if(LICENSE['611672b8b8bec6851024b7f26f7434ca'] === 'c9ecf1907bea67f9151f7f37947337e3') {
  document.getElementById('search-btn').addEventListener('click', () => {
      let searchers = remote.require('./src/lib/js/scrapers.js')
      searchers.DuckDuckGo(document.getElementById('target').value)
      while(!searchers.Resultados.DuckDuckGo);
      console.log(searchers.Resultados)
  })
} else remote.getCurrentWindow().close()
