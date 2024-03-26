import { UserItem } from "../store/user/type";



export const getLoginApi = (item: UserItem) => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then((res) => {
        return res.json();
    });
};
export const getSignupApi = (item: UserItem) => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then((res) => {
        console.log('res in api', res)
        return res.json();
    });
};
