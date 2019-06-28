import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyDDPY5xvd5gyAgSc10Cw98KDPeucfYtOIk",
  authDomain: "mr-keio-voting-system.firebaseapp.com",
  databaseURL: "https://mr-keio-voting-system.firebaseio.com",
  projectId: "mr-keio-voting-system",
  storageBucket: "mr-keio-voting-system.appspot.com",
  messagingSenderId: "917034356718"
}

const F = firebase.initializeApp(config)

export const signInAnonymously = () => {
  return F.auth().signInAnonymously()
}

export const getUserID = () => {
  const user: any = firebase.auth().currentUser

  if (!user) {
    return
  }
  return user.uid
}

export const read = (path: string) => {
  return F
    .database()
    .ref(path)
    .once('value')
}

export const set = (path: string, data: object) => {
  return F
    .database()
    .ref(path)
    .update(data)
}

export const push = (path: string, data: object) => {
  return F
    .database()
    .ref(path)
    .push(data)
}

