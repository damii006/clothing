import {  initializeApp  } from 'firebase/app' ;
import {  
    getAuth,
    signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
    } from 'firebase/auth';
 
    import { getFirestore, doc, getDoc, setDoc,} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBHjK6MwO2rDSfxEeJvgG2IQBuh902s0Q0",
    authDomain: "damilolas-clothing-db.firebaseapp.com",
    projectId: "damilolas-clothing-db",
    storageBucket: "damilolas-clothing-db.appspot.com",
    messagingSenderId: "529046119845",
    appId: "1:529046119845:web:32be978b6b4ec45c5af44c"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () =>
   signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () =>
   signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

 export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if(!userAuth) return;
  const userDocRef = doc (db, 'users', userAuth.uid);

  
  const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const {  displayName, email  } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email, 
          createdAt,
          ...additionalInformation
        });
      }
      catch (error) {
        console.log('errorrr', error.message);
      }
    }
    return userDocRef;
 }

 
export const createAuthUserWithEmailAndPassword = async (auth, email, password) => {
 if (!email || !password) return;

return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (auth, email, password) => {
  if (!email || !password) return;
 
 return await signInWithEmailAndPassword(auth, email, password)
 }