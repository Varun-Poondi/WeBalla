import { createContext, useState, useEffect } from "react";
import firebase from 'firebase/compat/app'
import firebaseAuth from 'firebase/compat/auth'
import 'firebase/compat/firestore'

import { useHistory } from 'react-router-dom';

import React from 'react';

// initial creation of context, will be placed inside useContext() in other components
export const AuthContext = createContext(null);

firebase.initializeApp({
    apiKey: "AIzaSyCJrA-0RyiaRPwLS6IWWH8om37F6GdmBO8",
    authDomain: "weballaoauth.firebaseapp.com",
    projectId: "weballaoauth",
    storageBucket: "weballaoauth.appspot.com",
    messagingSenderId: "177916021796",
    appId: "1:177916021796:web:30c20ef3aaaf8c60c51cb1",
    measurementId: "G-T5DTZ5BN0F"
  })
const db = firebase.firestore()

// children is all components inside AuthProvider in App.js
export function AuthProvider({ children }) {
    
    const [currentUser, setCurrentUser] = useState()

    const history = useHistory();

    // creating document in database
    const createUserDocument = async (user) => {
        if (!user) {
          return;
        }
    
        const userRef = db.doc(`users/${user.email}`)
        const snapshot = userRef.get()
    
        // if user id does not exist in database, create using set
        if (!(await snapshot).exists) {
    
          let currDate = new Date()
          let data = {
            name: user.displayName,
            uid: user.uid,
            createdAt: currDate,
            balance: 0,
            investments: [],
            leaderboardPos: null
          }
    
          try {
            await userRef.set(data);
          } catch (error) {
            console.log('Error in creating user', error);
          }
        } 
    }

    const updateNewsArticles = async(news) =>{
      for(let i =0; i < news.length; i++){
        if(!news[i]){
          return;
        }
        const newsRef = db.doc(`news/${String(news[i].articleTitle).replace("/"," ")}`);
        const articleExists = newsRef.get();
  
        if(!(articleExists).exists){
          try{
            await newsRef.set(news[i]);
          }catch(error){
            console.log('Error in creating news article', error);
          }
        }
      }
    }

    const getLeaderBoard = async () => {

      let userBalanceArr = []
      for (let i = 0; i < 10; i++) {
        userBalanceArr.push({balance: 0, name: ''})
      }

      const querySnapshot = await db.collection('users').get()
      for (const documentSnapshot of querySnapshot.docs) {
          const data = documentSnapshot.data()
          console.log(data);

          for (let a = 0; a < 10; a++) {
            if (data.balance > userBalanceArr[a].balance) {
              for (let b = 9; b > a; b--) {
                userBalanceArr[b] = userBalanceArr[b - 1];
              }
              userBalanceArr[a] = {balance: data.balance, name: data.name}
              break;
            }
          }
          //userBalanceArr.push({balance: data.balance, name: data.name})
      }

      console.log(userBalanceArr)
      return userBalanceArr
    }

    // if there is a user on load, update currentUser
    useEffect(() => {
        stateChange()
    }, [])
    function stateChange() {
      firebase.auth().onAuthStateChanged(async user => {
        setCurrentUser(user)
        console.log("in useEffect, user:", user)
        createUserDocument(user)
        getLeaderBoard()

        if (user) {
            history.push('/marketplace')
        }
        
      })
    }

    function googleOauth() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // The signed-in user info.
          var user = result.user;
          console.log("user", user);
          console.log("result", result);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function signOut() {
        firebase.auth().signOut()
    }

    const value = {
        currentUser,
        googleOauth,
        signOut,
        getLeaderBoard,
        updateNewsArticles
    }

    // every page will have access to data in value, AuthContext.Provider wrapped around children, which is every component inside AuthContext in app.js
    return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      )
}