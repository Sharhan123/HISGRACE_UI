import { Idriver } from "../interfaces";
import axiosWithAuth from "./axiosConfig";

export const addDriver = async (data: any) => {
    try {
        const response = await axiosWithAuth.post('/driver/addDriver', data)
        return response
    } catch (err) {
        throw err
    }
}

export const getDrivers = async () => {
    try {
        const response = await axiosWithAuth.get('/driver/getAllDrivers')
        return response
    } catch (err) {
        throw err
    }
}

export const updateDriver = async (data: any) => {
    try {
        const response = await axiosWithAuth.post('/driver/updateDriver',data)
    } catch (err) {
        throw err
    }
}

export const deleteDriver = async (id:any) =>{
    try{
        const response = await axiosWithAuth.delete(`/driver/deleteDriver/${id}`)
        return response
    }catch(err){
        throw err
    }
}

export const blockAndUnblock = async (id:any)=>{
    try{
        const response = await axiosWithAuth.get(`/driver/blockDriver/${id}`)
        return response
    }catch(err){
        throw err
    }
}