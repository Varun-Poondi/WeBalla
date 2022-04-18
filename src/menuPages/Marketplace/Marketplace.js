import React from 'react';
import Header from '../../partials/Header';
import Lukaku from '../../images/MarketPlace-Images/Lukaku.png'

function Marketplace() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />
      <div className="mt-24 w-full">
        
      </div>

      {/*  Page content */}
      <main className="flex-grow">
        <h1>Market Place - Premier League</h1>

        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <div class="px-6 py-4">
            <img src={Lukaku} alt="Lukaku"/>
            <div class="font-bold text-xl mb-2">Romelu Lukaku</div>
            <p class="text-gray-700 text-base"></p>
          </div>
    
        </div>


      </main>

    </div>

  );
}

export default Marketplace;