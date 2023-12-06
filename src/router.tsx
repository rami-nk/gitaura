import {createBrowserRouter} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import RepositoryViewPage from "./pages/RepositoryViewPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <div>Error</div>,
        children: [
            {
                index: true,
                element: <LandingPage/>
            },
            {
                path: "repositories/:username",
                element: <RepositoryViewPage/>
            }
        ]
    }
], {
    basename: "/gitaura"
});