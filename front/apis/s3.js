import axios from 'axios';
import { backUrl } from '../config/config';

const { GET, POST } = {
  GET: 'GET',
  POST: 'POST',
}

export function uploadFile(params) {
  const { inputFile: file, ...data } = params;

  const options = {
    method: POST,
    url: `/s3/upload`,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data,
  }

  const formData = new FormData();
  formData.append('file', file);
  options.data = { ...options.data, formData };

  console.log(options)

  return axios(options).then((response) => response);
}

export default {
  uploadFile,
}