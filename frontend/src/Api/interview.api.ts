import api from "./axios";

export const uploadInformation = async (data: FormData) => {
  const response = await api.post("/interview/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getInterviewReportByID = async (id: string) => {
  const response = await api.get(`/interview/${id}`);
  return response.data;
};

export const getRecentReport = async () => {
  const response = await api.get(`/interview/recent`);
  return response.data;
};

export const downloadTailoredCV = async (id: string) => {
  const response = await api.post(
    `/interview/generate-cv/${id}`,
    {},
    {
      responseType: "blob",
    },
  );
  return response.data;
};

export const downloadInterviewReportPDF = async (id: string) => {
  const response = await api.get(`/interview/download-report/${id}`, {
    responseType: "blob",
  });
  return response.data;
};
