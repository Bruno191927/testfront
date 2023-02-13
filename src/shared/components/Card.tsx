import React from 'react';
import { IService, IServiceDto } from '../interfaces/service.interface';
import { useMutation } from 'react-query';
import { deleteService } from '../services/api/service/service_api';

interface IProp {
  service: IServiceDto;
  onDelete: () => void;
  onUpdate: () => void;
}

function Card({ service, onDelete,onUpdate }: IProp) {
  return (
    <div className="border border-gray-300 w-[200px] h-[180px] flex flex-col justify-between">
      <div className="py-2 px-2">
        <h1 className="text-[20px] font-semibold">{service.name}</h1>
        <p className="text-[14px]">{service.description}</p>
      </div>
      <div className="bg-gray-100 py-2 px-2 border-t border-t-gray-300 flex justify-start items-center space-x-2">
        <button className="text-blue-500" onClick={onUpdate}>
          Editar
        </button>
        <button className="text-blue-500" onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Card;
