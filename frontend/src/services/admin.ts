import { AdminItem } from "../store/admin/type";



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

// delete user
export const deleteUserApi = async (userId: string) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};