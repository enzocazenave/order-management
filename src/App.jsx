import { LoginForm } from "./components/LoginForm";
import { Panel } from "./components/Panel";
import { useSelector } from "react-redux";

export const App = () => {

    const { auth } = useSelector(state => state.app);

    return (
        <>
            {
                (!auth)
                ? <LoginForm />
                : <Panel />
            }
        </>
    )
}
