import api from "./axios";

export const uploadInformation = async (data: FormData) => {
  const response = await api.post("/interview/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
