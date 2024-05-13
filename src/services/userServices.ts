import axiosWithAuth from "./axiosConfig";
import { Idata } from "../interfaces";
import { logout } from "../redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { showAlert } from "../redux/slices/alertSlice";


export const register = async (data: Idata) => {
    try {
        const response = await axiosWithAuth.post('/user/register', data);
        return response.data
    } catch (err) {
        console.log(err);
        throw err
    }
}

export const verifyotp = async (data: { value: string }) => {
    try {
        const response = await axiosWithAuth.post('/user/verifyOtp', data)
        return response.data
    } catch (err) {
        console.log(err);
        throw err
    }
}

export const resendOtp = async () => {
    try {
        const response = await axiosWithAuth.get('/user/resendOtp')
        return response
    } catch (err) {
        console.log(err);
        throw err

    }
}

export const verifyUser = async (id: string) => {
    try {
        console.log(id);

        const response = await axiosWithAuth.get(`/user/verifyBlocked/${id}`)
        return response
    } catch (err) {
        console.log(err);
        throw err

    }
}

export const sendForgetOtp = async (email: string) => {
    try {
        const response = await axiosWithAuth.post('/user/forgetPassword', { email })
        return response
    } catch (err) {
        console.log(err)
        throw err

    }
}

export const forgetVerify = async (data: any) => {
    try {
        const response = await axiosWithAuth.post('/user/forgetVerify', data)
        return response
    } catch (err) {
        console.log(err);
        throw err

    }
}

export const resetPassword = async (data: any) => {
    try {
        const response = await axiosWithAuth.post('/user/resetPassword', data)
        return response
    } catch (err) {
        console.log(err);
        throw err
    }
}

export const updateImage = async (data: any) => {
    try {
        console.log(data);
        
        const response = await axiosWithAuth.post('/user/updateImage', data)
        return response
    } catch (err) {
        throw err
    }
}

export const getUser = async ()=>{
    try{
        const response = await axiosWithAuth.get('/user/getUser')
        return response
    }catch(err){
        throw err
    }
}

export const handleLogout = () => {
    localStorage.removeItem('token')
    logout()
    showAlert({head:'Hisgrace Account Logout',content:'You have logged out from your hisgrace account , Please login to for booking .',color:"blue"})
    
} 

export const updateProfile = async(data:any)=>{
    try{
        const response = await axiosWithAuth.post('/user/updateProfile',data)
        return response
    }catch(err){
        throw err
    }
}


export const updateLastseen = async ()=>{
    try{
        const response = await axiosWithAuth.get('/user/updateLastseen')
        return response
    }catch(err){
        throw err
    }
}

export const updateAddress = async (data:any)=>{
    try{
        const response = await axiosWithAuth.post('/user/updateAddress',data)
        return response
    }catch(err){
        throw err
    }
}
export const updateUnRead = async (data:any)=>{
    const response = await axiosWithAuth.post('/user/updateUnRead',data)
    return response
}

export const updateNewMessage = async (data:any)=>{
    try{
        const response = await axiosWithAuth.post('/user/updateNewMessage',data)
        return response
    }catch(err){
        throw err
    }
}