
import AxiosConfig from "./AxiosConfig";
import { BASEURL } from "./BaseURL";

export const addDetails = async (reqbody) => {
  return await AxiosConfig('post', `${BASEURL}/courses`, reqbody);
};

export const getDetails = async () => {
  return await AxiosConfig('get', `${BASEURL}/courses`);
};

export const deleteDetails = async (id) => {
  return await AxiosConfig('delete', `${BASEURL}/courses/${id}`);
};

export const updateDetails = async (id,reqbody) => {
  return await AxiosConfig('put', `${BASEURL}/courses/${id}`,reqbody);
};