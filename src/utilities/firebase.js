import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react';

const firebaseConfig = {

  apiKey: "AIzaSyCdjdJQgZ5QAOkeArayU0Pd_Of5Z8QFOlY",

  authDomain: "fir-hosting-demo-cjk3833.firebaseapp.com",

  databaseURL: "https://firebase-hosting-demo-cjk3833-default-rtdb.firebaseio.com",

  projectId: "firebase-hosting-demo-cjk3833",

  storageBucket: "firebase-hosting-demo-cjk3833.appspot.com",

  messagingSenderId: "385371156229",

  appId: "1:385371156229:web:febcccea59104a6433916c"

};


const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);



export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) { console.log(`loading ${path}`); }
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (devMode) { console.log(val); }
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];
};
