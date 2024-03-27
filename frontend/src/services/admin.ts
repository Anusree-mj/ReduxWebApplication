import { AdminItem } from "../store/admin/type";
import { UserItem } from "../store/user/type";

// login
export const getAdminLoginApi = async (item: AdminItem) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/login`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};
// getuser details
export const getUsersDetailsApi = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};

//add user 
export const addUserApi = async (item: UserItem) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/addUser`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};