import { UserItem } from "../store/user/type";


// login
export const getLoginApi = async (item: UserItem) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/auth`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
};

// signup
export const getSignupApi = async (item: UserItem) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
          credentials: 'include'
    });
    return await res.json();
};

// get user
export const getUserProfileApi = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
          credentials: 'include'
    });
    return await res.json();
};

// update
export const getUploadApi = async (item: UserItem) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/profile`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        },
          credentials: 'include'
    });
    return await res.json();
};

