import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../css/mycss/main.css'
import { AuthContext } from '../AuthContext'

function Header() {

  const history = useHistory();

  const { currentUser, signOut } = useContext(AuthContext);

  const [top, setTop] = useState(true);

  function onSignOutClick() {
    signOut()
    console.log("Sign out has been pressed")
    history.push('/')
  }

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  // setting up profile name
  let userText = ''
  let userFirstChar = ''
  if (currentUser) {
      if (currentUser.displayName) {
        userText = 'Hello ' + currentUser.displayName
        if (currentUser.displayName.includes(' ')) {
          userText = 'Hello ' + currentUser.displayName.split(' ')[0]
        }
        userFirstChar = currentUser.displayName.charAt(0)
      }
  }

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white blur shadow-lg'}`}>
      <ul id="menu-selection" className="flex flex-grow justify-center flex-wrap items-center">
        <Link to="/marketplace" className="font-small text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Marketplace</Link>
        <Link to="/leaderboards" className="font-small text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Leaderboards</Link>
        <Link to="/trends" className="font-small text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Trends</Link>
        <Link to="/news" className="font-small text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">News</Link>
        <Link to="/profile" className="font-small text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Profile</Link>
      </ul>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="header-logo">
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect width="32" height="32" rx="16" fill="url(#header-logo)" fillRule="nonzero" />
              </svg>
            </Link>
          </div>

          <h1 className="logo-title">weballa</h1>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            {currentUser ? (
              <ul className="flex flex-grow w-2/4 justify-end">
                <li>
                  <div onClick={onSignOutClick} className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out cursor-pointer">Sign out</div>
                </li>

                <li>
                  <div className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3 cursor-pointer">
                    <span>{userText}</span>
                    {currentUser.photoURL ? (
                      <img className="w-6 h-6 ml-2 rounded-full"
                        alt=""
                        src={currentUser.photoURL}
                      />
                    ) : (
                      <div className="w-6 h-6 ml-2 bg-myteal-500 rounded-full flex justify-center cursor-pointer">{userFirstChar}</div>
                    )}       
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-grow w-2/4 justify-end flex-wrap items-center">
                <li>
                  <Link to="/signin" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Sign in</Link>
                </li>

                <li>
                  <Link to="/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                    <span>Sign up</span>
                    <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                    </svg>                  
                  </Link>
                </li>
              </ul>
            )}

          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
