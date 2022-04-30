import React from 'react';
import Header from '../../partials/Header';

function Marketplace() {
  return (
     <div className="flex flex-col min-h-screen overflow-hidden w-11/12 m-auto">

      {/*  Site header */}
      <Header />
      <div className="mt-24 w-full"></div>

      {/*  Page content */}
      <main className="flex-grow">
        <div className="grid grid-row-3 grid-flow-col gap-4">
          {/* Market Place Header */}
          <div className="row-span-1 col-span-1">
            <h1 className="h1 text-5xl md:text-30xl mb-5 mt-10">Marketplace</h1>
          </div>

          {/* Filtering Section */}
          
          <div className="row-span-1 col-span-1">
            <div className="p-7 rounded-lg border shadow mt-2">  
              <h1 className="h1 text-xl md:text-30xl mb-5">Filtering Options</h1>
              <div className="grid grid-flow-row">
                <span className="px-4 py-2 mr-5 mb-2 border rounded font-bold">Name</span>
                <span className="px-4 py-2 mr-5 mb-2 border rounded font-bold">Club</span>
                <span className="px-4 py-2 mr-5 mb-2 border rounded font-bold">Nationality</span>
                <span className="px-4 py-2 mr-5 mb-2 border rounded font-bold">Price</span>
                <span className="px-4 py-2 mr-5 mb-2 border rounded font-bold">Goals</span>
                <span className="px-4 py-2 mr-5 mb-2 border rounded font-bold">Assists</span>

              </div>
            </div>
          </div>
          

          {/* Player Display Section */}
          <div className="row-span-3 col-span-11">
            <div className="p-7 rounded-lg border shadow mt-2">             
              <h1 className="h1 text-xl md:text-30xl mb-5">Player Database</h1>

            </div>   
          </div>

        </div>
      </main>

    </div>

  );
}

export default Marketplace;