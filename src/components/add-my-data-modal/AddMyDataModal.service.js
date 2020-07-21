import { database } from 'firebase';

export const saveData = (roll, results) => database().ref('users/').push({ roll, results });

export const updateCount = () => {
  if (!window.location.href.includes("http://localhost:300")) {
    database().ref('/count').once("value").then(function (snapshot) {
      const count = snapshot.val();
      database().ref('/count').set(count + 1);
    });
  }

  // for (let i = 10; i < 75; i++) {
  //   setTimeout(() => {
  //     database().ref(`/userSelected/SE-0${i}`).set(0);
  //   }, 100)
  // }
}

export const updateSelectCount = roll => {
  if (!window.location.href.includes("http://localhost:300")) {
    database().ref(`/userSelected/${roll}`).once("value").then(function (snapshot) {
      const count = snapshot.val();
      database().ref(`/userSelected/${roll}`).set(count + 1);
    });
  }
}