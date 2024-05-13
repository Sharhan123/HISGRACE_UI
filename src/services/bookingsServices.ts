import axiosWithAuth from "./axiosConfig"

export const sendPayment = async(data:any)=>{
    try{
        const response = await axiosWithAuth.post('/bookings/getBookingSession',data)
        return response
    }catch(err){
        throw err
    }
}


export const getBookings = async ()=>{
    try{
        const response = await axiosWithAuth.get('/bookings/getBookings')
        return response 
    }catch(err){
        throw err
    }
}

export const getBookingsByuser = async ()=>{
    try{
        const response = await axiosWithAuth.get('/bookings/getBookingsByuser')
        return response
    }catch(err){
        throw err
    }
}

export const bookingStatus = async (data:any)=>{
    try{
        const response = await axiosWithAuth.post('/bookings/bookingStatus',data)
        return response
    }catch(err){
        throw err
    }
}