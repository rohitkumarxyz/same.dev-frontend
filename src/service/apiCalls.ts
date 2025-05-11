import axios from "axios";
import { PUBLIC_BACKEND_URL } from "../config/config";

export const getSourceCode = (projectId:string)=>{
    return axios.get(`${PUBLIC_BACKEND_URL}/source/${projectId}`);
}

export const getTemplate = (prompt: string) => {
    return axios.post(`${PUBLIC_BACKEND_URL}/template`, { prompt });
};


export const saveProject = (projectId: string, source: any) => {
    return axios.post(`${PUBLIC_BACKEND_URL}/source`, { source ,projectId});
}