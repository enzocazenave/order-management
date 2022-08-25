import { child, get, ref } from 'firebase/database';
import { FirebaseDB } from '../firebase/config';

export const getAllOrders = async() => {
    const dbref = ref(FirebaseDB);
    const result = [];

    await get(child(dbref, 'orders')).then((snapshot) => {
        if (snapshot.exists()) {   
            const plainResult = snapshot.val();

            const mappedResult = Object.keys(plainResult).map((key) => {
                result.push({
                    id: key,
                    client_info: plainResult[key]['client_info'],
                    completed: plainResult[key]['completed'],
                    date: plainResult[key]['date'],
                    name: plainResult[key]['name'],
                    qtty: plainResult[key]['qtty'],
                    total: plainResult[key]['total'],
                    type: plainResult[key]['type'],
                })
            })
        }
    })

    return result;
}