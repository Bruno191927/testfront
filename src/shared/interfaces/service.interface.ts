export interface IService {
  name: string;
  description: string;
  category?: string;
}

export interface IServiceDto {
    _id:string;
    name: string;
    description: string;
    category: string;
  }

export interface IUpdateServiceDto {
  id: string;
  data: IService;
}
