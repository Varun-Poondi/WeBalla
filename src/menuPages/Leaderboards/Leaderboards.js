import React, {useEffect, useContext, useState} from 'react';
import { AuthContext } from '../../AuthContext'
import Header from '../../partials/Header';

function Leaderboards() {

  const { getLeaderBoard } = useContext(AuthContext);

  const [leaders, setLeaders] = useState([]);

  useEffect( async () => {
    let leadersArr = await getLeaderBoard()
    setLeaders(leadersArr)
  }, [])

  console.log('leaders from leaderboards', leaders)

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />
      <div className="mt-24 w-full"></div>

      {/*  Page content */}
      <main className="flex-grow">
        <section className="">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <h1 className="h1 text-5xl md:text-6xl mb-5 mt-10">Leaderboards</h1>

          {
            leaders.map((item, i) =>
              <div className="p-7 rounded-lg border shadow mt-2">
                <div className="flex w-full">
                  <div className="text-2xl w-2/4 text-gray-700"><span className="px-4 py-2 mr-5 bg-blue-200 rounded font-bold">{i+1}</span>{item.name}</div>
                  <div className="text-2xl w-2/4 text-teal-500 text-right float-right font-bold"><span className="text-gray-500">$ </span>{item.balance}</div>
                </div>
              </div>
            )
          }

          <div className="h-52"></div>

          </div>
        </section>
        

      </main>

    </div>
  );
}

export default Leaderboards;