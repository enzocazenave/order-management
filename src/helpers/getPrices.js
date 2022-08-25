import { child, get, ref } from 'firebase/database';
import { FirebaseDB } from '../firebase/config';

export const getPrices = async() => {
    const dbref = ref(FirebaseDB);
    const result = [];

    await get(child(dbref, 'prices')).then((snapshot) => {
        if (snapshot.exists()) {   
            const plainResult = snapshot.val();
            result.push(plainResult.album);
            result.push(plainResult.package);
        }
    })

    return result;
}