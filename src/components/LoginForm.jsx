import { useForm } from "../hooks/useForm"

const initialForm = {
    password: ''
}

export const LoginForm = () => {
    const { password, onInputChange } = useForm(initialForm)

    const onLoginClick = (event) => {
        event.preventDefault();
        console.log(password);
    }

    return (
        <div className="l-container">
            <form className="l-container__form" onSubmit={ onLoginClick }>
                <h1 className="l-container__form-title">Gestión de pedidos</h1>
                <input 
                    className="l-container__form-input" 
                    type="password" 
                    value={ password }
                    onChange={ onInputChange }
                    name="password"
                />
                <button className="l-container__form-button" type="submit"><i className="fas fa-lock"></i>Ingresar</button>
            </form>
        </div>
    )
}
