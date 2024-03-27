import { useEffect, useState } from "react";
import Header from "../components/header"
import { useNavigate } from "react-router-dom";
import { UserItem } from "../store/user/type";
const ProfileScreen = () => {
    const [userInfo, setUserInfo] = useState<UserItem | null>()
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            navigate('/login')
        }
        else {
            setUserInfo(JSON.parse(userData))
        }
    }, [])
    return (
        <>
            <Header />
            <div className="d-flex flex-column justify-content-center align-items-center mt-5"> 
                <img
                    src={userInfo?.image} 
                    alt="Picture"
                    className="rounded-circle mb-3"
                    style={{ width: "200px", height: "200px" }} 
                />
                <h1>Welcome {userInfo?.name}</h1>
            </div>
        </>
    )
}

export default ProfileScreen