import { Ipackage, IpackageEdit, IpackageRes } from "../interfaces"
import axiosWithAuth from "./axiosConfig"

export const addPackage = async (data:Ipackage)=>{
    try{

        const response = await axiosWithAuth.post('/package/addPackage',data)
        return response
    }catch(err){
       console.log(err)
       throw err 
    }
}

export const getPackages = async ()=>{
    try{
        const response = await axiosWithAuth.get('/package/getPackages')
        return response
    }catch(err){
        console.log(err)
        throw err
        
    }
} 

export const editPackage = async(data:IpackageEdit)=>{
    try{
        const response = await axiosWithAuth.post('/package/editPackage',data)
        return response
    }catch(err){
        console.log(err)
        throw err
    }
}

export const deletePackage = async(id:any)=>{
    try{
        const response = await axiosWithAuth.delete(`/package/deletePackage/${id}`)
        return response
    }catch(err){
        throw err
    }
}

export const blockPackage = async (id:any)=>{
    try{
        const response = await axiosWithAuth.get(`/package/blockPackage/${id}`)
        return response
    }catch(err){
        throw err
    }
}