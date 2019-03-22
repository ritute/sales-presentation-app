import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

// const PRESENTATIONS_API_URL = 'http://localhost:4000/api/presentations';
const PRESENTATIONS_API_URL =
  'https://my-json-server.typicode.com/ritute/sales-presentation-app/presentations';

const cache = setupCache({
  maxAge: 15 * 60 * 1000  // 15 mins
});

const api = axios.create({
  adapter: cache.adapter
});

export default {
  presentations: {
    getOne: id => api.get(`${PRESENTATIONS_API_URL}/${id}`),
    getAll: () => api.get(PRESENTATIONS_API_URL),
    update: (id, toUpdate) => api.put(`${PRESENTATIONS_API_URL}/${id}`, toUpdate),
    create: toCreate => api.post(PRESENTATIONS_API_URL, toCreate),
    delete: id => api.delete(`${PRESENTATIONS_API_URL}/${id}`)
  }
};
