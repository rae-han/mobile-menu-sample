import axios from 'axios';
import { backUrl } from '../config/config';

const { GET, POST } = {
  GET: 'GET',
  POST: 'POST',
}

export function uploadFile(file) {
  const options = {
    method: POST,
    url: `/s3/upload`
  }

  return axios(options).then((response) => response);
}

export default {
  uploadFile,
}