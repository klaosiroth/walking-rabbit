import axiosInstance from 'src/utils/axios';

export const getProducts = async () => {
  const { data: products } = await axiosInstance.get('/api/products');
  return products;
};

export const addProduct = async (product) => {
  return await axiosInstance.post('/api/products', product);
};

export const updateProduct = async (product) => {
  return await axiosInstance.patch(`/api/products/${product.id}`, product);
};

export const deleteProduct = async ({ id }) => {
  return await axiosInstance.delete(`/api/products/${id}`, id);
};
