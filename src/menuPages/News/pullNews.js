const axios = require('axios')
//npm install axios to use this

// axios
//   .get('https://newsdata.io/api/1/news?apikey=pub_6700e40d2cac5e7694afa02135111aa38377&q=premier%20league&country=gb&language=en&category=sports ')
//   .then(res => {
//     //console.log(`statusCode: ${res.status}`)
//     console.log(`numarticles: ${res.totalResults}`);
//     //console.log(res.totalResults);
//   })
//   .catch(error => {
//     console.error(error)
//   })


export default async function callNews(){
  
  let newsObjectArr = [0];

  const config = {
    method: "get",
    url: 'https://newsdata.io/api/1/news?apikey=pub_6700e40d2cac5e7694afa02135111aa38377&q=premier%20league&country=gb&language=en&category=sports',
    headers: {},
  };

   await axios(config)
    .then(function (response) {
      newsObjectArr = response.data.results;
      
    })
    .catch(function (error) {
      console.log(error);
    })
    var newsArticles = [];
    
    for(let i =0; i < newsObjectArr.length; i++){
      newsArticles.push({
        articleTitle: String(newsObjectArr[i].title),
        link: String(newsObjectArr[i].link),
        description: String(newsObjectArr[i].description),
        datePublished: String(newsObjectArr[i].pubDate),
        content: String(newsObjectArr[i].content)
      });
    }
    
    return newsArticles;

}
  
(async () => {
  //let b = (await callNews());
  //updateNewsArticles(b);
})()