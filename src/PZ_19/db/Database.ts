import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {User} from './models';

const USERS_REF = '/users';

export const registerUser = async (
  email: string,
  pass: string,
  name: string,
  dayOfBirth: string,
): Promise<User | null> => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      pass,
    );
    const uid = userCredential.user.uid;

    const newUser: User = {
      id: uid,
      email: email,
      name: name,
      dayOfBirth: dayOfBirth,
      status: 'Новичок',
    };

    await database().ref(`${USERS_REF}/${uid}`).set(newUser);

    return newUser;
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return null;
  }
};

export const loginUser = async (email: string, pass: string): Promise<User | null> => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, pass);
    const uid = userCredential.user.uid;

    const snapshot = await database().ref(`${USERS_REF}/${uid}`).once('value');

    if (snapshot.exists()) {
      return snapshot.val() as User;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Ошибка входа:', error);
    return null;
  }
};

export const logoutUser = async () => {
  return auth().signOut();
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const snapshot = await database().ref(USERS_REF).once('value');
    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    const usersArray: User[] = Object.keys(data).map(key => ({
      ...data[key],
      id: key,
    }));

    return usersArray;
  } catch (error) {
    console.error('Ошибка загрузки списка:', error);
    return [];
  }
};

export const updateUser = async (user: User): Promise<boolean> => {
  if (!user.id) {return false;}
  try {
    await database().ref(`${USERS_REF}/${user.id}`).update({
      name: user.name,
      status: user.status,
      dayOfBirth: user.dayOfBirth,
    });
    return true;
  } catch (error) {
    console.error('Ошибка обновления:', error);
    return false;
  }
};

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return auth().onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      const snapshot = await database().ref(`${USERS_REF}/${firebaseUser.uid}`).once('value');
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};
