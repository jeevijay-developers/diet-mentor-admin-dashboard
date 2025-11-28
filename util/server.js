import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const uploadImage = async (file, folder = "uploads") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  return axios.post(`${API_BASE_URL}/uploads/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Blog APIs
export const createBlog = async (data) => {
  return axios.post(`${API_BASE_URL}/blogs`, data);
};

export const getBlogs = async () => {
  return axios.get(`${API_BASE_URL}/blogs`);
};

export const getBlogById = async (id) => {
  return axios.get(`${API_BASE_URL}/blogs/${id}`);
};

export const getBlogBySlug = async (slug) => {
  return axios.get(`${API_BASE_URL}/blogs/slug/${slug}`);
};

export const updateBlog = async (id, data) => {
  return axios.put(`${API_BASE_URL}/blogs/${id}`, data);
};

export const deleteBlog = async (id) => {
  return axios.delete(`${API_BASE_URL}/blogs/${id}`);
};

// Diet Plan APIs
export const createDietPlan = async (data) => {
  return axios.post(`${API_BASE_URL}/dietplans`, data);
};

export const getDietPlans = async () => {
  return axios.get(`${API_BASE_URL}/dietplans`);
};

export const getDietPlanById = async (id) => {
  return axios.get(`${API_BASE_URL}/dietplans/${id}`);
};

export const updateDietPlan = async (id, data) => {
  return axios.put(`${API_BASE_URL}/dietplans/${id}`, data);
};

export const deleteDietPlan = async (id) => {
  return axios.delete(`${API_BASE_URL}/dietplans/${id}`);
};

// Category APIs
export const createCategory = async (data) => {
  return axios.post(`${API_BASE_URL}/categories`, data);
};

export const getCategories = async () => {
  return axios.get(`${API_BASE_URL}/categories`);
};

export const getCategoryById = async (id) => {
  return axios.get(`${API_BASE_URL}/categories/${id}`);
};

export const updateCategory = async (id, data) => {
  return axios.put(`${API_BASE_URL}/categories/${id}`, data);
};

export const deleteCategory = async (id) => {
  return axios.delete(`${API_BASE_URL}/categories/${id}`);
};
