import axiosWithAuth from "./axiosConfig"

export const adminSignin = async (data:any)=>{

    try{

        const response = await axiosWithAuth.post('/admin/signin',data)
        
        return response
    }catch(err){
        throw err
    }
    
    


}

export const getUsers = async ()=>{
    try{
        const response = await axiosWithAuth.get('/admin/getUsers')
        return response
    }catch(err){
        throw err
    }
}

export const blockUser = async (id:any)=>{
    try{

        if(id){
            
            const res = await axiosWithAuth.get(`/admin/blockUser/${id}`)
            return res
        }
    }catch(err){
        throw err
    }
}