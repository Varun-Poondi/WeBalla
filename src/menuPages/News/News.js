import React, {useEffect, useContext, useState} from 'react';
import { AuthContext } from '../../AuthContext'
import Header from '../../partials/Header';
import callNews from './pullNews';

function News() {
  const { updateNewsArticles } = useContext(AuthContext);

  async function sayHello() {
    let pulledNews = await callNews();
    alert("News has been pulled");
    updateNewsArticles(pulledNews);
  }


  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />
      <div className="mt-24 w-full"></div>

      {/*  Page content */}
      <main className="flex-grow">
        <h1>hello from news</h1>
        <button onClick={sayHello}>Default</button>
        
      </main>

    </div>
  );
}

export default News;