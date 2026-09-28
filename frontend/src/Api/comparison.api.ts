import api from "./axios";

export const uploadComparison = async (data: FormData) => {
  const response = await api.post("/comparison/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getComparisonByID = async (id: string) => {
  const response = await api.get(`/comparison/${id}`);
  return response.data;
};

export const getComparisonHistory = async () => {
  const response = await api.get("/comparison/history");
  return response.data;
};
