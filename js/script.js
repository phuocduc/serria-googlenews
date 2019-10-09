let news = [];

async function fetchNew(sources,query)
{
    // https://newsapi.org/v2/top-headlines?apiKey=e99c0ab30cd54aafb336e90838ef62d3&country=us
    let url = `https://newsapi.org/v2/${sources}?${query}&apiKey=e99c0ab30cd54aafb336e90838ef62d3`
    let result = await fetch(url)
    let data = await result.json()
    news = data.articles;
    console.log(news.map(items=>items.source))
    renderNews(news)
}

function renderNews(arr)
{
    const html = arr.map(articles=>
     `
 <div class="news-items">  
    <div class="news-info col-12 col-md-7">
        <h1 class="news-title">${articles.title}</h1>
        <p class="news-content">${articles.content}<span><a href="${articles.url}" class="news-viewmore">Read More</a></span></p>
        <p class="news-time">${moment(articles.publishedAt).fromNow()}</p>
        <p class="news-source">${articles.source.name}</p>
        
    </div>
    <div class="col-12 col-md-5 news-img">
        <img src="${articles.urlToImage}" alt="" />
    </div>
</div>`
    ).join("<hr>")
    document.getElementById('noOfArticle').innerHTML = `${arr.length}`
   document.getElementById('show').innerHTML = html
}

fetchNew('everything','q=news')