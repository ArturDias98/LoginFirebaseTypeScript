import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
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
    });
  } catch (error: any) {
    return (model = {
      result: false,
      message: firebaseErrorMessages(error.code),
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
    });
  } catch (error: any) {
    return (model = {
      result: true,
      message: firebaseErrorMessages(error.code),
    });
  }
}

export type MessageModel = {
  result: boolean;
  message: string;
};
