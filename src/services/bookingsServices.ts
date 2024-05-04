import axiosWithAuth from "./axiosConfig"

export const getBookings = async ()=>{
    try{
        const response = await axiosWithAuth.get('/bookings/getBookings')
        return response 
    }catch(err){
        throw err
    }
}