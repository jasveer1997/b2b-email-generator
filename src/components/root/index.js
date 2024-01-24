import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReduxStoreProvider from '../../helper/store';
import Dashboard from "../../container/dashboard";

const AppWithReduxStoreAndRoutes = () => {
    return (
        <ReduxStoreProvider>
        <Router>
            <Routes>
                <Route path="*" element={<Dashboard />} />
            </Routes>
        </Router>
        </ReduxStoreProvider>
    );
};

export default AppWithReduxStoreAndRoutes;
