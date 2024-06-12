import axios from "axios";
import c from "./client.config.json";
import store from '../User/store'

const port = process.env.NODE_ENV === "production" ? 80 : c["port"];
const baseURL = c["protocol"] + "://" + c["host"] + ":" + port + c["path"] + c["version"];

export const Api = axios.create({
    baseURL: baseURL,
    withCredentials: true
})
Api.req = async (apiCall) => {
    return apiCall().catch((e) => console.log(e))
}
Api.interceptors.request.use(function (config) {
    try{
        const token = store.getState().user.token;
        config.headers.Authorization =  'Bearer ' + token; 
    }catch(e){}
    return config;
});
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
});
// await Api.get('GameType/getAll')
// Api.defaults.headers['Authorization'] = 'sdfsdfsd';

function prepareParams(data, params) {
    if (params === undefined || params.length === 0) {
        return ""
    }
    for (var i = 0; i < params.length; i++) {
        if (!data.hasOwnProperty(params[i])) {
            throw Error("Invalid request, lack of parameter: " + params[i])
        }
    }

    return "?" + params.map((param) => {
        return "" + param + "=" + data[param]
    }).join("&")
}

function prepareBody(data, body) {
    if (body === undefined || body.length === 0) {
        return {}
    }

    for (var i = 0; i < body.length; i++) {
        if (!data.hasOwnProperty(body[i])) {
            throw Error("Invalid request, lack of body parameter: " + body[i])
        }
    }
    
    const dictionary = {};
    for (const key of body) {
        if (data.hasOwnProperty(key)) {
            dictionary[key] = data[key];
        }
    }

    return dictionary
}

async function Request(data, endpoint, apifunc) {
    console.log(apifunc)
    apifunc = c["urls"][endpoint]["functions"][apifunc];
    const path = apifunc["path"];
    const method = apifunc["method"];
    const params = apifunc["params"];
    const body = apifunc["body"];
    const reqParams = prepareParams(data, params);
    const reqBody = prepareBody(data, body);
    const user = store.getState().user;
    const h = { 
        "accept": "*/*",
    };

    if (user !== null) {
        h["Authorization"] = "Bearer " + user.token;
    }
    
    
    const url = c["urls"][endpoint]["path"] + path + reqParams;
    await Api({
            method: method,
            url: url,
            data: reqBody,
            headers: h
        }).then((res) => {
            console.log(res)
            return res.data
        }).catch((err) => {
            console.log(err)
        })
}

export {
    Request,
}