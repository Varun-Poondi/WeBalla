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

    // if there is a user on load, update currentUser
    useEffect(() => {
        stateChange()
    }, [])
    function stateChange() {
      firebase.auth().onAuthStateChanged(async user => {
        setCurrentUser(user)
        console.log("in useEffect, user:", user)
        createUserDocument(user)

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
        signOut
    }

    // every page will have access to data in value, AuthContext.Provider wrapped around children, which is every component inside AuthContext in app.js
    return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      )
}