import { async } from "@firebase/util";
import { ref, set, remove } from "firebase/database";
import { FirebaseDB } from "../firebase/config"

export const createNewOrder = ({ name, qtty, type, price, info }) => {
    return async(dispatch, getState) => {
        const total = qtty * price;
        var date;
        
        let fecha = new Date();
        let day = fecha.getDate();
        let month = fecha.getMonth() + 1;
        let year = fecha.getFullYear();

        if (month < 10) {
            date = `${day}/0${month}/${year}`;
        } else {
            date = `${day}/${month}/${year}`;
        }

        const data = {
            name, qtty, total, date, type, completed: false, client_info: info
        }

        const id = new Date().getTime();

        const reference = ref(FirebaseDB, `orders/${id}`);

        await set(reference, data);
    }
}

export const deleteOrder = (id) => {
    return async(dispatch, getState) => {
        const reference = ref(FirebaseDB, `orders/${id}`);
        remove(reference);
    }
}

export const updatePrice = (price, type) => {
    return async(dispatch, getState) => {
        const reference = ref(FirebaseDB, `prices/${type}`);
        await set(reference, price);
    }
}

export const completeOrder = (id) => {
    return async(dispatch, getState) => {
        const reference = ref(FirebaseDB, `orders/${id}/completed`);
        await set(reference, true);
    }
}