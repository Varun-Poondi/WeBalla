import React, {useEffect, useContext, useState} from 'react';
import { AuthContext } from '../../AuthContext'
import Header from '../../partials/Header';
import callNews from './pullNews';

function News() {
  const { updateNewsArticles } = useContext(AuthContext);

  async function pullNews() {
    let pulledNews = await callNews();
    alert("News has been pulled");
    updateNewsArticles(pulledNews);
  }

  const { getNewsArticles } = useContext(AuthContext);

  const [news, setNews] = useState([]);

  useEffect( async () => {
    getNews(true);
  }, [])

  async function getNews(inorder){
    let newsArr = await getNewsArticles(inorder);
    setNews(newsArr)
  }

  function changeOrder(inorder){
    if(inorder){
      inorder=false;
      
    }else{
      inorder = true;
    }
    getNews(inorder);
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden w-11/12 m-auto">

      {/*  Site header */}
      <Header />
      <div className="mt-24 w-full"></div>

      {/*  Page content */}
      <main className="flex-grow">
        <h1 className="h1 text-9xl md:text-30xl mb-5 mt-10">News</h1>
        <button onClick={()=> changeOrder(false)} className="px-2 py-3/2 mr-2 bg-blue-200 rounded font-bold" >Sort by latest</button>
        <button onClick={()=> changeOrder(true)} className="px-2 py-3/2 mr-2 bg-blue-200 rounded font-bold" >Sort by oldest</button>
        <button onClick={pullNews} className="px-2 py-3/2 mr-2 bg-blue-200 rounded font-bold" >Pull News</button>
          {
            news.map((item, i) =>
              <div onClick={() => alert('\n' + (item.content) + '\n\n' + 'Published: ' + item.datePublished + '\n' + item.link)}  className="p-7 rounded-lg border shadow mt-2 cursor-pointer mb-5">
                <div className="flex w-full">
                  <div className="text-2xl w-5/6 text-gray-700">
                    <span className="px-2 py-3/2 mr-2 bg-blue-200 rounded font-extrabold">{'see more'}</span>{item.articleTitle}
                    <p class="text-xs text-slate-500">{item.description}</p>
                  </div>  
                </div>
              </div>
            )
          }
        
      </main>

    </div>
  );
}

export default News;