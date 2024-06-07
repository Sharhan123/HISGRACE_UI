import axiosWithAuth from "./axiosConfig"

export const savePackageBooking = async(data:any)=>{
    try{
        const response = await axiosWithAuth.post('/packageBooking/savePackageBooking',data)
        return response
    }catch(err){
        throw err
    }
}


export const getPackageBookings = async ()=>{
    try{
        const response = await axiosWithAuth.get('/packageBooking/getPackageBookings')
        return response 
    }catch(err){
        throw err
    }
}

export const getPackageBookingsByuser = async ()=>{
    try{
        const response = await axiosWithAuth.get('/packageBooking/getPackageBookingsByuser')
        return response
    }catch(err){
        throw err
    }
}

export const PackagebookingStatus = async (data:any)=>{
    try{
        const response = await axiosWithAuth.post('/packageBooking/PackagebookingStatus',data)
        return response
    }catch(err){
        throw err
    }
}