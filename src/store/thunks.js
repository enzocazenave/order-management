import { ref, set } from "firebase/database"
import { FirebaseDB } from "../firebase/config"

export const createNewOrder = () => {
    return async(dispatch, getState) => {
        const data = {
            name: 'Enzo Cazenave', qtty: 15, total: 1550, date: '24/08/2022', type: 'album', completed: false, client_info: "Numero de telefono: 15-4528-0608"
        }

        const id = new Date().getTime();

        const reference = ref(FirebaseDB, `orders/${id}`);

        await set(reference, data);
    }
}

