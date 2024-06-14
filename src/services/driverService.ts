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

export const findDriver = async (id:any)=>{
    try{
        const response = await axiosWithAuth.get(`/driver/findDriver/${id}`)
        return response
    }catch(err){
        throw err
    }
}

export const updateDriver = async (data: any) => {
    try {
        const response = await axiosWithAuth.post('/driver/updateDriver',data)
        return response
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

export const verifyOtp = async (data:any)=>{
    try{
        const response = await axiosWithAuth.post('/driver/verifyOtp',data)
        return response
    }catch(err)
    {
        throw err
    }
}

export const updateRequest = async (data:any)=>{
    try{
        const response = await axiosWithAuth.post('/driver/updateRequest',data)
        return response
    }catch(err){
        throw err
    }
}
export const removeDriverById = async (id:any)=>{
    try{
        const response = await axiosWithAuth.get(`/driver/removeDriver/${id}`)
        return response
    }catch(err){
        throw err
    }
}
export const resendOtp = async (email:string)=>{
    try{
        const response = await axiosWithAuth.post('/driver/resendOtp',{email})
        return response 
    }catch(err){
        throw err
    }
}
export const driverLogin = async (data:any)=>{
    try{
        const response = await axiosWithAuth.post('/driver/driverLogin',data)
        return response
    }catch(err){
        throw err
    }
}
export const driverReview = async (data:any)=>{
    try{
        const response = await axiosWithAuth.post('/reviews/saveReview',data)
        return response
    }catch(err){
        throw err
    }
}