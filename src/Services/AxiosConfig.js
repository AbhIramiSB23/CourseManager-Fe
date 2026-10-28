import axios from "axios";
import { toast } from "react-toastify";

const AxiosConfig = async (method, url, data) => {
  try {
    return await axios({ method, url, data })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong in the axios");
  }
};

export default AxiosConfig