import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Food";
import Orders from "./pages/Orders";
import UserOrder from "./pages/UserOrder";

export default function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Layout />}>

                    <Route index element={<Dashboard />} />

                    <Route
                        path="foods"
                        element={<Categories />}
                    />

                    <Route
                        path="orders"
                        element={<Orders />}
                    />

                    <Route
                        path="user"
                        element={<UserOrder />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}