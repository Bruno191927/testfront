import { useEffect, useState } from 'react';
import { Card, FormComponent } from '../../shared/components';
import { ICategory } from '../../shared/interfaces/category.interface';
import { IServiceDto } from '../../shared/interfaces/service.interface';
import { useMutation } from 'react-query';
import { getCategories } from '../../shared/services/api/category/category_api';
import {
  deleteService,
  getServices,
  getServicesByCategory,
} from '../../shared/services/api/service/service_api';

function Home() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categorySelected, setCategorySelected] = useState<ICategory>();
  const [services, setServices] = useState<IServiceDto[]>([]);
  const [serviceSelected,setServiceSelected] = useState<IServiceDto>();

  const getServicesInfo = () => {
    if (!categorySelected || categorySelected.all) {
      getServicesMutation.mutate();
    } else {
      getServicesByCategoryMutation.mutate(categorySelected._id);
    }
  }

  const resetServiceSelected = () => {
    setServiceSelected(undefined);
  }

  const getServicesMutation = useMutation({
    mutationFn: getServices,
    onSuccess: (data: IServiceDto[]) => {
      setServices(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const getServicesByCategoryMutation = useMutation({
    mutationFn: getServicesByCategory,
    onSuccess: (data: IServiceDto[]) => {
      setServices(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  })

  const deleteServiceMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      getServicesInfo();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const getCategoriesMutation = useMutation({
    mutationFn: getCategories,
    onSuccess: (data: ICategory[]) => {
      setCategories(data);
      setCategorySelected(data[0]);
      getServicesInfo();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  useEffect(() => {
    getCategoriesMutation.mutate();
  }, []);

  useEffect(()=>{
    getServicesInfo();
  },[categorySelected,setCategorySelected])

  return (
    <div className="w-full">
      <div className="text-[28px] font-semibold w-full flex justify-center mt-4">
        <h1>Servicios</h1>
      </div>
      <div className="w-full px-5">
        <div className="bg-gray-100 w-full px-3 flex space-x-3 py-3">
          {categories.map((category: ICategory, index: number) => (
            <div
              key={index}
              className={`font-semibold ${
                categorySelected && categorySelected._id === category._id
                  ? 'text-black'
                  : 'text-gray-400'
              }`}
            >
              <button
                onClick={() => {
                  setCategorySelected(category);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex mt-3 px-5 justify-between">
        <div className="w-10/12 flex space-x-3">
          {services.map((service: IServiceDto, index: number) => (
            <Card
              key={index}
              service={service}
              onUpdate={()=>{
                setServiceSelected(service);
              }}
              onDelete={() => {
                deleteServiceMutation.mutate(service._id);
              }}
            />
          ))}
        </div>
        <FormComponent
          categorySelect={categorySelected}
          getServicesInfo={getServicesInfo}
          serviceSelected={serviceSelected}
          resetServiceSelected={resetServiceSelected}
        />
      </div>
    </div>
  );
}

export default Home;
