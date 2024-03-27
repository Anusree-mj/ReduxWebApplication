import { RoutesType } from "./types";

import Home from "../screens/HomeScreen";
import { ErrorPage } from "../screens/ErrorScreen";
import LoginScreen from "../screens/loginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";

export const routes: RoutesType = [
    { path: "/", element: Home },
    { path: "/login", element: LoginScreen },
    { path: "/register", element: RegisterScreen },
    { path: "/updateProfile", element: UpdateProfileScreen },

    { path: "*", element: ErrorPage },
]