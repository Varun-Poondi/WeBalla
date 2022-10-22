import React, {useEffect, useContext, useState} from 'react';
import { AuthContext } from '../../AuthContext'
import Header from '../../partials/Header';
import playerResults from './backend/scrape_prem_players/results.json';

function Marketplace() {
   
  // const {getPlayers} = useContext(AuthContext);
  // const [players, setPlayers] = useState([]);


  // async function getAllPlayers(){
  //   console.log("In GAP");
  //   let tempPlayers = await getPlayers(); // pass in json file
  //   setPlayers(tempPlayers);
  // }

  

  // useEffect( async () => {
  //   getAllPlayers();
  // }, []) // run when page first loads

  let players = [].concat(...playerResults)
  console.log(players);
  
  return (
     <div className="flex flex-col min-h-screen overflow-hidden w-11/12 m-auto">

      {/*  Site header */}
      <Header/>
      <div className="mt-24 w-full"></div>

      {/*  Page content */}
      <main className="flex-grow">
        <div className="grid grid-row-3 grid-flow-col gap-4">
          {/* Market Place Header */}
          <div className="row-span-1 col-span-1">
            <h1 className="h1 text-6xl md:text-30xl mb-5 mt-10">Marketplace</h1>
          </div>

          {/* Filtering Section */}
          
          <div className="row-span-1 col-span-1">
            <div className="p-7 rounded-lg border shadow mt-2">  
              <h1 className="h1 text-2xl md:text-30xl mb-5">Filtering Options</h1>
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
          <div className="row-span-3 col-span-11 overflow-scroll h-screen">
            <div className="p-7 rounded-lg border shadow mt-2">             
              <h1 className=" text-center h1 text-5xl md:text-30xl mb-5">Player Database</h1>
              {/* grid grid-flow-row-dense grid-cols-4 */}
              <div className="flex flex-wrap">
                {
                  players.map((player, i) =>
                  
                    <href className="p-7 rounded-lg border shadow mt-2 mb-2 ml-2 mr-2 hover:bg-gray-100">  
                      <div className="flex flex-wrap text-lg">
                        <div className="">
                          <span className=" px-2 py-3/2 mr-2 bg-indigo-200 rounded font-extrabold">{player.Name}</span>
                        </div>
                        <div>
                          <span className="px-2 py-3/2 mr-2 bg-yellow-200 rounded font-extrabold">$price</span>
                        </div>
                      </div>
                      <div className="">
                          <div className="">
                            <span className=" bg-teal-200 px-2 py-3/2 mr-2  rounded font-extrabold">Nation: {player.Nation}</span>
                          </div>
                          <div className="">
                            <span className="bg-red-100 px-2 py-3/2 mr-2  rounded font-extrabold">Club: {player.ClubTeam}</span>
                          </div>
                          <div className="">
                            <span className="bg-teal-200 px-2 py-3/2 mr-2  rounded font-extrabold">League: {player.League}</span>
                          </div>
                          <div className="">
                            <span className="bg-red-100 px-2 py-3/2 mr-2  rounded font-extrabold">Age: {player.Age}</span>
                          </div>
                          <div className="">
                            <span className="bg-teal-200 px-2 py-3/2 mr-2  rounded font-extrabold">Position: {player.Pos}</span>
                          </div>
                        </div>

                    </href>
                  
                  )
                }
                </div>
            </div>   
          </div>

        </div>
      </main>

    </div>

  );
}

export default Marketplace;