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
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  getDoc,
  doc,
  where,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
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

const firestore = getFirestore();

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
export async function GetTransactions(user: User): Promise<Transaction[]> {
  //Creating a query
  const collect = collection(firestore, "transactions");

  const _query = query(
    collect,
    where("user.uid", "==", user.uid),
    orderBy("date", "desc")
  );

  let data = await getDocs(_query);

  const transactions = data.docs.map((doc) => ({
    ...doc.data(),
    uid: doc.id,
  })) as Transaction[];
  return transactions;
}
export async function SetTransaction(
  model: Transaction
): Promise<MessageModel> {
  let result: MessageModel;
  try {
    //const _doc = doc(firestore, "transactions", model.user.uid);
    const _doc = doc(collection(firestore, "transactions"));
    await setDoc(_doc, model);
    return (result = {
      result: true,
      message: "",
      error: null,
    });
  } catch (error: any) {
    return (result = {
      result: false,
      message: "Error on save",
      error: error,
    });
  }
}
export async function UpdateTransaction(
  transaction: Transaction
): Promise<MessageModel> {
  let result: MessageModel;
  try {
    const _doc = doc(firestore, "transactions", transaction.uid as string);
    //const _doc = doc(collection(firestore, "transactions"), transaction.uid as string);
    await updateDoc(_doc, transaction);

    return (result = {
      result: true,
      message: "",
      error: null,
    });
  } catch (error: any) {
    return (result = {
      result: false,
      message: "Error on save",
      error: error,
    });
  }
}
export async function DeleteTransaction(
  transaction: Transaction
): Promise<MessageModel> {
  let result: MessageModel;
  try {
    const _doc = doc(firestore, "transactions", transaction.uid as string);
    await deleteDoc(_doc);
    return (result = {
      result: true,
      message: "",
      error: null,
    });
  } catch (error: any) {
    return (result = {
      result: false,
      message: "Error on delete",
      error: error,
    });
  }
}
export async function GetTransactionByUid(
  uid: string
): Promise<Transaction | null> {
  try {
    const _doc = doc(firestore, "transactions", uid);
    let data = await getDoc(_doc);
    return data.data() as Transaction;
  } catch (error) {
    return null;
  }
}
/**
 * Keep signed users logged.
 * @param page
 */
export function UserStateChanged(callback: (user: User) => void) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
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
export type Transaction = {
  type: string;
  date: string;
  money: Money;
  info: string;
  uid?: string;
  user: MyUser;
  description?: string;
};
export type Money = {
  currency: string;
  value: number;
};
export type MyUser = {
  uid: string;
};
