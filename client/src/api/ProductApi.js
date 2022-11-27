import axiosClient from "./axiosClient";

export const getProductsApi = (category = "All", page = 1, limit = 10) => {
  return axiosClient.get(
    `/api/product?category=${category}&page=${page}&limit=${limit}`
  );
};

export const getOneProductApi = (id) => {
  return axiosClient.get(`/api/product/${id}`);
};

export const addProduct = (newProduct) => {
  return axiosClient.post("/api/product", newProduct);
};

export const deleteProductApi = (id) => {
  return axiosClient.delete(`/api/product/${id}`);
};

export const getConfigurationApi = (id) => {
  return axiosClient.get(`/api/product/configuration/${id}`);
};

export const getDescriptionApi = (id) => {
  return axiosClient.get(`/api/product/description/${id}`);
};

export const updateProductApi = (id, updateProduct) => {
  return axiosClient.put(`/api/product/${id}`, updateProduct);
};

export const searchProductApi = (searchText) => {
  return axiosClient.get(`/api/product/search/find?q=${searchText}`);
};
