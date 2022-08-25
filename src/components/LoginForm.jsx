import { useForm } from "../hooks/useForm";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/appSlice";
import { getPrices } from "../helpers/getPrices";
import Swal from "sweetalert2";

const initialForm = {
    password_l: ''
}

export const LoginForm = () => {
    const { password_l, onInputChange } = useForm(initialForm);
    const { password } = useSelector(state => state.app);
    const dispatch = useDispatch();
    
    const onLoginClick = (event) => {
        event.preventDefault();
        
        if (password === password_l) {
            getPrices().then(prices => dispatch(login(prices)));
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Contraseña incorrecta',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }

    return (
        <div className="l-container">
            <form className="l-container__form" onSubmit={ onLoginClick }>
                <h1 className="l-container__form-title">Gestión de pedidos</h1>
                <input 
                    placeholder="Contraseña"
                    className="l-container__form-input" 
                    type="password" 
                    value={ password_l }
                    onChange={ onInputChange }
                    name="password_l"
                />
                <button className="l-container__form-button" type="submit"><i className="fas fa-lock"></i>Ingresar</button>
            </form>
        </div>
    )
}
