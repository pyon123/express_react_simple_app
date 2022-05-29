import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_API_SERVER_URL || "http://localhost:3010";

const request = axios.create({
  baseURL: `${BASE_URL}`,
});

export const getRequest = async (url, params) => {
  const res = await request.get(url, { params });

  return res.data;
};

export const postRequest = async (url, data) => {
  const settings = {};

  const normalized = normalizeRequestData(data);

  if (normalized instanceof FormData) {
    settings.headers = { "Content-Type": "multipart/form-data" };
  }

  const res = await request.post(url, normalized, settings);

  return res.data;
};

export const normalizeRequestData = (data) => {
  if (data instanceof FormData) {
    return data;
  }

  let formData = null;

  if (hasFileField(data)) {
    formData = convertToFormData(data);
  }

  return formData ? formData : data;
};

const hasFileField = (data) => {
  for (let field in data) {
    if (data.hasOwnProperty(field)) {
      if (data[field] instanceof File || data[field] instanceof Blob) {
        return true;
      } else if (data[field] instanceof Object) {
        return hasFileField(data[field]);
      }
    }
  }

  return false;
};

const convertToFormData = (data) => {
  let formData = new FormData();

  for (let field in data) {
    if (data.hasOwnProperty(field)) {
      if (data[field] instanceof Array) {
        data[field].forEach((item) => {
          formData.append(field, item);
        });
      } else {
        formData.append(field, data[field]);
      }
    }
  }

  return formData;
};

export default request;
