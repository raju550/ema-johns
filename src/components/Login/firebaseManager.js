import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
export const initializeFirebaseLogin = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};
export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      return signedInUser;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.massage);
    });
};
export const handleSignInFb = () => {
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var user = result.user;
      user.success = true;
      return user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);

      // ...
    });
};
export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const userSignOut = {
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
        error: "",
        success: false,
      };
      return userSignOut;
    })
    .catch((error) => {});
};
export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      userUpdateInfo(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};
export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};
export const userUpdateInfo = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      console.log("user name update successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
