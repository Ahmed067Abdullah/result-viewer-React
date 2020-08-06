import firebase, { database } from 'firebase';

export const saveData = (roll, results) => database().ref('users/').push({ roll, results });

export const updateCount = path => {
  if (!window.location.href.includes("http://localhost:300") && firebase.apps.length) {
    const ref = database().ref(path);
    ref.once("value").then(snapshot => ref.set(snapshot.val() + 1));
  }
};
