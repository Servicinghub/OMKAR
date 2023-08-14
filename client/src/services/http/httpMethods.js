import instance from './httpInstance'

export function get(url,config){
    return instance.get(url,config)
}

export function post(url,data,config){
    return instance.post(url,data,config)
}

export function put(url,data,config){
    return instance.put(url,data,config)
}

export function patch(url,data,config){
    return instance.get(url,data,config)
}

export function del(url,config){
    return instance.delete(url,config)
}