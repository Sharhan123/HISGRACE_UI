import { jwtDecode } from "jwt-decode";

export const verifyUser = (navigate:any) => {
    
    const token = localStorage.getItem('token');

    if (token) {
        const tokenDecoded = jwtDecode(token)
        if (tokenDecoded?.exp) {
            const currentTime = Date.now() / 1000;
            console.log(tokenDecoded.exp , currentTime);
            
            if (tokenDecoded.exp < currentTime) {
                localStorage.removeItem('token');
                navigate('/signin-signup');
            }
        } else {
            console.error("Invalid token payload: 'exp' property is missing or undefined");
        }
    }
};
