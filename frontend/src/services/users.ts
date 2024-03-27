import { UserItem } from "../store/user/type";



export const getLoginApi = async (item: UserItem) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};
export const getSignupApi = async (item: UserItem) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
          credentials: 'include'
    });
    return await res.json();
};

export const getUploadApi = async (item: UserItem) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
          credentials: 'include'
    });
    return await res.json();
};
