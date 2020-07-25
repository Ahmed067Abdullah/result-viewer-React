import { database } from 'firebase';

export const saveData = (roll, results) => database().ref('users/').push({ roll, results });
