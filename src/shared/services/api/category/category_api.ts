import axios from 'axios';
import { ICategory } from '../../../interfaces/category.interface';

const categoryApi = axios.create({
    baseURL: 'https://fronttest-back-production.up.railway.app/category',
});

export const getCategories = async() => {
    const {data} = await categoryApi.get<ICategory[]>('/');
    return data;
}