import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.withCredentials = true;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axios.create({
  // just run the ipconfig in cmd and change the baseurl to IPv4 address here
  // baseURL: 'https://doc-sahab.herokuapp.com',
  baseURL: 'http://192.168.0.107:5000',
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  // baseURL: 'https://doc-sahab.herokuapp.com'
  // baseURL: 'https://doc-sahab.herokuapp.com'
});
// just run the ipconfig in cmd and change the IPv4 address here
