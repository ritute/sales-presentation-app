import { find, findIndex, pullAllBy } from 'lodash';
import axios from 'axios';
import shortid from 'shortid';
import MockAdapter from 'axios-mock-adapter';
import UrlPattern from 'url-pattern';

import db from './db.json';

const API_ROOT_URL = 'http://localhost:4000/api';
// const API_ROOT_URL =
//   'https://my-json-server.typicode.com/ritute/sales-presentation-app';

const api = axios.create({
  baseURL: API_ROOT_URL,
});

// Don't evoke this function if want to use actual json-server api
(function mockApi() {
  const mock = new MockAdapter(api, { delayResponse: 500 });

  const presentations = db.presentations;

  const getAllPattern = new UrlPattern('*/presentations');
  const getOnePattern = new UrlPattern('*/presentations/:id');

  const getIdFromUrl = url => getOnePattern.match(url).id;

  mock
    // getOne
    .onGet(getOnePattern.regex).reply(({ url }) => (
      [200, find(presentations, { id: getIdFromUrl(url) })]
    ))
    // getAll
    .onGet(getAllPattern.regex).reply(200, presentations)
    // update
    .onPut(getOnePattern.regex).reply(({ url, data }) => {
      const index = findIndex(presentations, { id: getIdFromUrl(url) });
      const dataObj = JSON.parse(data);
      presentations.splice(index, 1, dataObj);
      return [200, dataObj];
    })
    // create
    .onPost(getAllPattern.regex).reply(({ data }) => {
      const newPresentation = {
        id: shortid.generate(),
        ...JSON.parse(data)
      };
      presentations.push(newPresentation);
      return [201, newPresentation];
    })
    // delete
    .onDelete(getOnePattern.regex).reply(({ url }) => {
      pullAllBy(presentations, { id: getIdFromUrl(url) });
      return [200, {}];
    });
})();

export default {
  presentations: {
    getOne: id => api.get(`/presentations/${id}`),
    getAll: () => api.get('/presentations'),
    update: (id, toUpdate) => api.put(`/presentations/${id}`, toUpdate),
    create: toCreate => api.post('/presentations', toCreate),
    delete: id => api.delete(`/presentations/${id}`)
  }
};
