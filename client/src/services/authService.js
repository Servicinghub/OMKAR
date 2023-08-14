import {get,put,del,post,patch} from './http/httpMethods'

function register(payload){
 return post('/auth/register',payload).then((response)=>{
    return response;
 }).catch((err)=>console.log(err));
} 
function login(payload){
    return post('/auth/login',payload).then((response)=>{
       return response;
    })
}

export const authService={
    register,
    login
}