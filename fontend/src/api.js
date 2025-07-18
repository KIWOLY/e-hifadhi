import axios from "axios"
import { ACCESS_TOKEN } from "./constants"  



// It creates a customized Axios instance with a default base URL for all HTTP requests.
// An Axios instance is a custom version of Axios with its own configuration, like base URL, headers, and interceptors.
const api =axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL
    }
)

// config Accepts the Axios config object (which contains URL, headers, data, etc.)
//  Lets you change or add things like headers, tokens, or base URL

api.interceptors.request.use(
    
    (config)=>{

        const token=localStorage.getItem(ACCESS_TOKEN)
        
        if(token){
            config.headers.Authorization= `Bearer ${token}`
        }

        return config
    },
    (error) =>{
        return Promise.reject(error)
    }
)
 export default api