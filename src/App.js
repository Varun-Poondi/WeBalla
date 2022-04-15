import React, { useEffect } from 'react';
import { AuthProvider } from './AuthContext'
import {
  Switch,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';

import Profile from './menuPages/Profile/Profile'
import Trends from './menuPages/Trends/Trends'
import News from './menuPages/News/News'
import Marketplace from './menuPages/Marketplace/Marketplace'
import Leaderboards from './menuPages/Leaderboards/Leaderboards'

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Switch>
        <AuthProvider>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/trends">
            <Trends />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/marketplace">
            <Marketplace />
          </Route>
          <Route path="/leaderboards">
            <Leaderboards />
          </Route>
          </AuthProvider>
      </Switch>
    </>
  );
}

export default App;
