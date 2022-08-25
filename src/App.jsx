import { LoginForm } from "./components/LoginForm";
import { Panel } from "./components/Panel";

export const App = () => {

    const authenticated = true;

    return (
        <>
            {
                (!authenticated)
                ? <LoginForm />
                : <Panel />
            }
        </>
    )
}
