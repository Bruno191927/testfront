import axios from "axios";
import { IService, IServiceDto, IUpdateServiceDto } from '../../../interfaces/service.interface';

const serviceApi = axios.create({
    baseURL: 'https://fronttest-back-production.up.railway.app/servicio',
});

export const getServices = async() => {
    const {data} = await serviceApi.get<IServiceDto[]>('/');
    return data;
}

export const getServicesByCategory = async(id:string) => {
    const {data} = await serviceApi.get<IServiceDto[]>(`/category/${id}`);
    return data;
}

export const createService = async(service:IService) => {
    const {data} = await serviceApi.post('/',service);
    return data;
}

export const updateService = async(service:IUpdateServiceDto) => {
    const {data} = await serviceApi.patch(`/${service.id}`,service.data);
    return data;
}

export const deleteService = async(id:string) => {
    const {data} = await serviceApi.delete(`/${id}`);
    return data;
}