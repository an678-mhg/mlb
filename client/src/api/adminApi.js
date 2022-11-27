import axiosClient from "../api/axiosClient";

export const getAllUsers = (page) => {
  return axiosClient.get(`/api/admin/users?${page}`);
};

export const deleteUsersApi = (id) => {
  return axiosClient.delete(`/api/admin/users?id=${id}`);
};

export const getUser = (id) => {
  return axiosClient.get(`api/admin/user/${id}`);
};

export const updateUserApi = (updateUsers) => {
  return axiosClient.put(`api/admin/users`, updateUsers);
};
