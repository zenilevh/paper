import './index.css'
import './input.css'
import { StoreProvider } from "easy-peasy";
import store from "./Store";
import Router from 'Router';
import { BrowserRouter } from 'react-router-dom'

const App = () => {
    //ini untuk nutupin BE proses, karena harusnya Fetch database di Statemanagement, cuman karena ga ada DB jadi harus set dari awal initial nya buat persist DB.

    return (
        <StoreProvider store={store}>
            <BrowserRouter >
                <Router />
            </BrowserRouter>
        </StoreProvider>
    );
}

export default App;
