import React,  { useContext, useEffect, useState } from 'react';
import Header from '../../partials/Header';
import varunPic from '../../images/Comet Card Photo.png'
import { AuthContext } from '../../AuthContext'

import { useHistory } from 'react-router-dom';


function Profile() {

  const { currentUser, getBalance } = useContext(AuthContext);

  const history = useHistory();

  const [userName, setUserName] = useState('')
  const [balance, setBalance] = useState(0)

  useEffect(async () => {
    if (!currentUser) {
        history.push('/signin')
    }

    //setUserName(currentUser.displayName)
    let currBalance = await getBalance(currentUser)
    setBalance(currBalance)
  }, [])


  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />
      <div className="mt-24 w-full"></div>

      {/*  Page content */}
      <main>
        <div className="flex justify-center">
          <p className="text-5xl"><strong>Profile</strong></p>
        </div>
        <div className="flex space-x-4">
          <div className="pl-10 pr-10">
            <img src={varunPic} alt="user-profile" width={400} heigh={200}/>

              <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-6 text-2xl">
                  Edit Profile
                </button>
              </div>
          </div>

          <div className="pl-10 pr-10">         

              <div className="pt-10 flex justify-center max-w-3xl rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    
                    {currentUser ? (
                      <p className="text-5xl">Username: {currentUser.displayName}</p>
                    ) : (
                      <p className="text-5xl"></p>
                    )}
                  </div>
                </div>
              </div>

        
              <div className="pt-10 flex justify-center max-w-3xl rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {currentUser ? (
                      <p className="text-5xl">Balance: {balance}</p>
                    ) : (
                      <p className="text-5xl">Balance: </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-6 text-3xl">
                  Check Balance Information
                </button>
              </div>

              <div className=" pt-10 flex justify-center content-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-6 text-3xl">
                  Delete Account
                </button>
              </div>
          </div>

          <div className="pl-10 pr-10">
            <div className="pt-10 flex justify-center max-w-3xl rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">

                  <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">Romelu Lukaku</div>
                      <p className="text-gray-700 text-base">
                          <ul>
                            <li>League: Premier League</li>
                            <li>Position: ST</li>
                            <li>Goals: 10</li>
                            <li>Assists: 2</li>
                          </ul>
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Chelsea</span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Belgium</span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">24yo</span>
                    </div>
                  </div>

                  <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">Neymar Jr.</div>
                      <p className="text-gray-700 text-base">
                          <ul>
                            <li>League: Ligue 1</li>
                            <li>Position: RW</li>
                            <li>Goals: 15</li>
                            <li>Assists: 10</li>
                          </ul>
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Paris Saint Germain</span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Brazil</span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">28yo</span>
                    </div>
                  </div>


                  <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">Luka Modric</div>
                      <p className="text-gray-700 text-base">
                          <ul>
                            <li>League: La Liga</li>
                            <li>Position: CM/LM</li>
                            <li>Goals: 4</li>
                            <li>Assists: 5</li>
                          </ul>
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Real Madrid</span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Croatia</span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">36yo</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        <div class="max-w-sm rounded overflow-hidden shadow-lg">

        </div>

      </main>

    </div>
  );
}

export default Profile;