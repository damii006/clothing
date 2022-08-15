import {  initializeApp  } from 'firebase/app' ;
import {  getAuth,
    signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider,
    } from 'firebase/auth';
 
    import {
        getFirestore,
        doc,
        getDoc,
        setDoc
    } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBHjK6MwO2rDSfxEeJvgG2IQBuh902s0Q0",
    authDomain: "damilolas-clothing-db.firebaseapp.com",
    projectId: "damilolas-clothing-db",
    storageBucket: "damilolas-clothing-db.appspot.com",
    messagingSenderId: "529046119845",
    appId: "1:529046119845:web:32be978b6b4ec45c5af44c"
  };

  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider ();
  provider.setCustomParameters({
    prompt:  "select_account"
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = ()  => signInWithPopup (auth, provider);

  export const db = getFirestore();
    
  export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc( db, 'users', userAuth.uid); 
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef );
    console.log(userSnapshot)
    console.log(userSnapshot.exists());
  
    if (!userSnapshot.exists()) {
      const{  displayName, email  } = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      }catch (error) {
        console.log('error creating the user', error.message);
      }
    } 

     return userDocRef
  };