import createApi from '../middlewares/createApi';
import { baseQuery } from '../bases/baseQuery';
import { sortOptionsValue } from '../../constants/sortConstant';
import { Product } from '../../type/product-type';

export const productService = createApi({
  reducerPath: 'productService',
  baseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      Product[],
      {
        sort?: string;
        brands?: string[];
        models?: string[];
      }
    >({
      query: ({ sort = '', brands = [], models = [] }) => {
        let queryString = '?';

        if (sort && sortOptionsValue[sort as keyof typeof sortOptionsValue]) {
          queryString += `&${
            sortOptionsValue[sort as keyof typeof sortOptionsValue]
          }`;
        }

        if (brands.length > 0) queryString += `&brand=${brands.join(',')}`;
        if (models.length > 0) queryString += `&model=${models.join(',')}`;

        return {
          url: queryString,
          method: 'GET',
        };
      },
      transformResponse: (response: Product[]) => {
        return response;
      },
      transformErrorResponse: (meta, error) => {
        return {
          error: error?.response?.status,
          message:
            error?.response?.statusText ||
            'An error occurred while fetching products.',
        };
      },
    }),
    getFilterProducts: builder.query<Product[], {}>({
      query: () => {
        return {
          url: '/',
          method: 'GET',
        };
      },
      transformResponse: (response: Product[]) => {
        const brands = new Set<string>();
        const models = new Set<string>();

        response.forEach((product) => {
          if (product.brand) brands.add(product.brand);
          if (product.model) models.add(product.model);
        });

        return response;
      },
      transformErrorResponse: (response) => {
        return response;
      },
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => {
        return {
          url: `/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: Product) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response;
      },
    }),
    deleteProductById: builder.mutation<Product, string>({
      query: (id) => {
        return {
          url: `/${id}`,
          method: 'DELETE',
        };
      },
      transformResponse: (response: Product) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response;
      },
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => {
        console.log(newProduct);

        return {
          url: `/`,
          method: 'POST',
          body: newProduct,
        };
      },
      invalidatesTags: ['Product'],
      transformResponse: (response: Product) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response;
      },
    }),
    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: (updateProduct) => {
        const { id, ...data } = updateProduct;
        return {
          url: `/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Product'],
      transformResponse: (response: Product) => response,
      transformErrorResponse: (response) => response,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetFilterProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductByIdMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productService;

export default productService;
