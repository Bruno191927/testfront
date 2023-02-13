import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  IService,
  IServiceDto,
  IUpdateServiceDto,
} from '../interfaces/service.interface';
import { ICategory } from '../interfaces/category.interface';
import { useMutation } from 'react-query';
import {
  createService,
  updateService,
} from '../services/api/service/service_api';

interface IProp {
  categorySelect?: ICategory;
  getServicesInfo: () => void;
  serviceSelected?: IServiceDto;
  resetServiceSelected: () => void;
}

function FormComponent({
  categorySelect,
  getServicesInfo,
  serviceSelected,
  resetServiceSelected
}: IProp) {
  const initialValues: IService = {
    name: serviceSelected ? serviceSelected.name : '',
    description: serviceSelected ? serviceSelected.description : '',
    category: '',
  };

  const createServiceMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      getServicesInfo();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      getServicesInfo();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const serviceSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={serviceSchema}
      enableReinitialize={true}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        if (serviceSelected) {
          const newUpdateService: IUpdateServiceDto = {
            id: serviceSelected._id,
            data: {
              name: values.name,
              description: values.description,
              category: categorySelect?._id,
            },
          };
          updateServiceMutation.mutate(newUpdateService);
        } else {
          const newService: IService = {
            description: values.description,
            name: values.name,
            category: categorySelect?._id,
          };
          createServiceMutation.mutate(newService);
        }
        resetServiceSelected();
        actions.resetForm();
      }}
    >
      <Form>
        <div className="border border-gray-300 w-[300px]">
          <div>
            <div className="space-y-5 py-3 px-4">
              <h2>Servicio</h2>
              <div>
                <div>
                  <label htmlFor="Nombre">Nombre</label>
                </div>
                <div>
                  <Field
                    type="text"
                    name="name"
                    className="border border-gray-400 w-full py-2 focus:outline-none px-3"
                  />
                </div>
              </div>
              <div className="pb-6">
                <div>
                  <label htmlFor="Descripcion">Descripcion</label>
                </div>
                <div>
                  <Field
                    type="text"
                    name="description"
                    className="border border-gray-400 w-full py-2 focus:outline-none px-3"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-100 py-2 px-2 border-t border-t-gray-300 flex justify-center items-center">
              <button
                type="submit"
                className="text-green-400 bg-white border border-green-400 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Grabar
              </button>
              <button
                type="reset"
                className="text-red-400 bg-white border border-red-400 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
export default FormComponent;
