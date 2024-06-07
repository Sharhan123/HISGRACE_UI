import {  IvehicleRes } from "../interfaces";
import axiosWithAuth from "./axiosConfig";

export const addVehicle = async(data:any)=>{
try{
    const response = await axiosWithAuth.post('/vehicle/addVehicle',data)

    return response
}catch(err){
    console.log(err);
    throw err
}
    

}

export const getVehicles = async()=>{
    try{

        const response = await axiosWithAuth.get('/vehicle/getAllVehices')
        return response

    }catch(err){
        throw err
    }
}

export const unBlockedVehicles = async ()=>{
    try{
        const response = await axiosWithAuth.get('/vehicle/getAllVehices')
        const arr = response.data.data.filter((item:IvehicleRes)=>item.isBlocked === false)
        response.data.data = arr
        return response
    }catch(err){
        console.log(err);
        
    }
}

export const deleteVehicle = async (id:any)=>{
    try{
        const response = await axiosWithAuth.delete(`/vehicle/deleteVehicle/${id}`)
        return response
    }catch(err){
        console.log(err);
        throw err
        
    }
}
export const updateVehicle = async (data:any)=>{
    try{
        const response = await axiosWithAuth.post('/vehicle/updateVehicle',data)
        return response
    }catch(err){
        throw err
    }
}

export const blockVehicle = async (id:any)=>{
    try{
        const response = await axiosWithAuth.get(`/vehicle/blockVehicle/${id}`)
        return response
    }catch(err){
        throw err
    }
}

export const getBookingVehicles = async (data:any)=>{
    try{
        const response = await axiosWithAuth.post('/vehicle/getBookingVehicles',data)
        return response
    }catch(err){
        throw err
    }
}

export const setVehicleReview = async (data:any)=>{
    try{
        const response = await axiosWithAuth.post('/vehicle/setReview',data)
        return response
    }catch(err){
        throw err
    }
}