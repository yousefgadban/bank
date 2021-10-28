import axios from 'axios'
const api = axios.create({
    baseURL: "https://6177eef89c328300175f5c4a.mockapi.io/api/v1/customers"
})


export const GetUserData = async (id)=>{
    return await api.get("/"+id);
}

export const GetAllAction = async (id)=>{
    return await api.get(`/${id}/actions`)
}



export const AddWithDrawal=async(params)=>{
    return await api.post(`/${params.customerId}/actions`, params)
}

export const TransferCash=async(params)=>{
    return await api.post(`/${params.customerId}/actions`, params)
}

export const AddNewUser=async(params)=>{
    return await api.post(`/`, params)
}

export const GetAllUsers = async ()=>{
    return await api.get("/")
}

export const DeleteUser = async (id)=>{
    return await api.delete("/"+id)
}


