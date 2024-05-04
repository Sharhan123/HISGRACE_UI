import { jwtDecode } from "jwt-decode";

export const verifyAdminToken = (navigate:any) => {
    
    const token = localStorage.getItem('admin');

    if (token) {
        const tokenDecoded = jwtDecode(token)
        if (tokenDecoded?.exp) {
            const currentTime = Date.now() / 1000;
            console.log(tokenDecoded.exp , currentTime);
            
            if (tokenDecoded.exp < currentTime) {
                localStorage.removeItem('admin');
                navigate('/admin');
            }
            return
        } else {
            console.error("Invalid token payload: 'exp' property is missing or undefined");
        }
    }
};
