import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCk3sHWzkIZKSRKusbnw1wGtcttkHgMViY",
  authDomain: "matchall-ed7c5.firebaseapp.com",
  projectId: "matchall-ed7c5",
  storageBucket: "matchall-ed7c5.appspot.com",
  messagingSenderId: "671252300657",
  appId: "1:671252300657:web:1a9e7b4d63fbc7fc202cd0",
  measurementId: "G-5HPHCNLKHR"
};

export const initFirebase = () => {
  if (typeof window !== "undefined" && !getApps().length) {
    initializeApp(firebaseConfig);
  }
};
