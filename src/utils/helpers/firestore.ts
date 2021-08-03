import { db } from '../../config/firebase.config';

async function createUser(username: string) {
    // const db = firebase.firestore();
    const userRef = await db.collection('users').add({
        username: username,
    });
}

export { createUser };
