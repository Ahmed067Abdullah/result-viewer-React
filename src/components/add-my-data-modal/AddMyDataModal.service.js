import { database } from 'firebase';

export const saveData = (roll, results) => database().ref('users/').push({ roll, results });

export const updateCount = () => {
  if (!window.location.href.includes("http://localhost:300")) {
    database().ref('/count').once("value").then(function (snapshot) {
      const count = snapshot.val();
      database().ref('/count').set(count + 1);
    });
  }
}