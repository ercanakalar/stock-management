import * as Yup from 'yup';

export const createProductInitial = {
  name: 'AAAA',
  image: 'https://loremflickr.com/640/480/city',
  price: '1',
  description: 'Each project gets its own unique base URL that all endpoints under it will share.',
  model: 'Taurus',
  brand: 'Ferrari',
  quantity: 1,
};

export const createProductValidation = Yup.object({
  name: Yup.string().required('Name is required'),
  image: Yup.string().url('Invalid URL').required('Image URL is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be a positive number'),
  description: Yup.string().required('Description is required'),
  model: Yup.string().required('Model is required'),
  brand: Yup.string().required('Brand is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .integer('Quantity must be an integer')
    .min(0, 'Quantity must be at least 0'),
});
