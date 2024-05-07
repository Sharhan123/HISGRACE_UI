import axiosWithAuth from "./axiosConfig"

export const saveChat = async (data:any)=>{
    try{
        const response = await axiosWithAuth.post('/chat/saveChat',data)
        return response
    }catch(err){
        throw err
    }
}

export const findChats = async (id:any)=>{
    try{
        const response = await axiosWithAuth.get(`/chat/getChats/${id}`)
        return response
    }catch(err){
        throw err
    }
}