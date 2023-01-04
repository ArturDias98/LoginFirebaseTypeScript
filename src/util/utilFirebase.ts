import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { firebaseErrorMessages } from "./utilities";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBIQVYhOEl6rnitC9HCe564NUw1NdZC810",
  authDomain: "login-671f2.firebaseapp.com",
  projectId: "login-671f2",
  storageBucket: "login-671f2.appspot.com",
  messagingSenderId: "20202641939",
  appId: "1:20202641939:web:fa3285c1a32c621759bde6",
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth();

export async function Login(
  email: string,
  password: string
): Promise<MessageModel> {
  let model: MessageModel;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return (model = {
      result: true,
      message: "",
      error: null,
    });
  } catch (error: any) {
    return (model = {
      result: false,
      message: firebaseErrorMessages(error.code),
      error: error,
    });
  }
}
export async function RequestEmail(email: string): Promise<MessageModel> {
  let model: MessageModel;
  try {
    await sendPasswordResetEmail(auth, email);
    return (model = {
      result: true,
      message: "Email sent successfully",
      error: null,
    });
  } catch (error: any) {
    return (model = {
      result: false,
      message: firebaseErrorMessages(error.code),
      error: error,
    });
  }
}
export async function RegisterNewUser(
  email: string,
  password: string
): Promise<MessageModel> {
  let model: MessageModel;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return (model = {
      result: true,
      message: "Successfully registered user",
      error: null,
    });
  } catch (error: any) {
    return (model = {
      result: false,
      message: firebaseErrorMessages(error.code),
      error: error,
    });
  }
}
export async function LogOut(): Promise<MessageModel> {
  let model: MessageModel;
  try {
    await signOut(auth);
    return (model = {
      result: true,
      message: "",
      error: null,
    });
  } catch (error: any) {
    return (model = {
      result: false,
      message: "Cannot logout",
      error: error,
    });
  }
}
/**
 * Keep signed users logged.
 * @param page
 */
export function UserStateChanged(callback: (user: User) => void) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //
      callback(user);
    }
  });
}
/**
 * Keep unsigned users out of home page
 * @param page
 */
export function AuthGuard(page: string) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = page;
    }
  });
}
export type MessageModel = {
  result: boolean;
  message: string;
  error: any;
};
