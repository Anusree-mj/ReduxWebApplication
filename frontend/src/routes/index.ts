import { RoutesType } from "./types";

import Home from "../screens/HomeScreen";
import { ErrorPage } from "../screens/ErrorScreen";
import LoginScreen from "../screens/loginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export const routes: RoutesType = [
    { path: "/", element: Home },
    { path: "/login", element: LoginScreen },
    { path: "/register", element: RegisterScreen },


    { path: "*", element: ErrorPage },
]