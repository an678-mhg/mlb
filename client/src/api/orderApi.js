import axiosClient from "./axiosClient";

export const createOrderApi = (newOrder) => {
  return axiosClient.post("/api/order", newOrder);
};

export const getMyOrderApi = (page) => {
  return axiosClient.get(`/api/order/my-order?page=${page}`);
};

export const getOrderbyIdApi = (id) => {
  return axiosClient.get(`/api/order/${id}`);
};

export const getAllOrderApi = (page) => {
  return axiosClient.get(`/api/order?page=${page}`);
};

export const editOderbyId = (order) => {
  return axiosClient.put('/api/order', order)
}
