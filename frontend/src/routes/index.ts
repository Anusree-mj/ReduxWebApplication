import { RoutesType } from "./types";

import Home from "../screens/user/HomeScreen";
import { ErrorPage } from "../screens/user/ErrorScreen";
import LoginScreen from "../screens/user/loginScreen";
import RegisterScreen from "../screens/user/RegisterScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import UpdateProfileScreen from "../screens/user/UpdateProfileScreen";
import AdminLoginScreen from "../screens/admin/AdminLoginScreen";
import AdminScreen from "../screens/admin/AdminScreen";
import AddUserScreen from "../screens/admin/AddUserScreen";

export const routes: RoutesType = [
    { path: "/", element: Home },
    { path: "/login", element: LoginScreen },
    { path: "/register", element: RegisterScreen },
    { path: "/profile", element: ProfileScreen },
    { path: "/updateProfile", element: UpdateProfileScreen },
    { path: "/admin/login", element: AdminLoginScreen },
    { path: "/admin", element: AdminScreen },
    { path: "/admin/addUser", element: AddUserScreen },
    { path: "*", element: ErrorPage },
]