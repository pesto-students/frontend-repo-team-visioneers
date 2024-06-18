import { axiosi } from "../../config/axios";

export const createProjectAI = async (data) => {
  try {
    const res = await axiosi.post(`/createai`, data);
    return { data: res.data };
  } catch (error) {
    throw error.response.data;
  }
};
