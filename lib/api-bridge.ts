import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "@/global";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

export const get = async (url: string) => {
  try {
    const result = await axiosInstance.get(url);
    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.code}: something wrong`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something were wrong: ${error}`,
    };
  }
};

export const newPost = async (url: string, data: string | FormData) => {
  try {
    const result = await axiosInstance.post(url, data, {});
    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.response.data.message}`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something were wrong`,
    };
  }
};
