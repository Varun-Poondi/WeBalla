import React from 'react';
import Header from '../../partials/Header';

function Leaderboards() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />
      <div className="mt-24 w-full"></div>

      {/*  Page content */}
      <main className="flex-grow">
      
        <h1>hello from leaderboards</h1>
        

      </main>

    </div>
  );
}

export default Leaderboards;