import axios from 'axios';

export default axios.create({
  // just run the ipconfig in cmd and change the IPv4 address here
  baseURL: 'http://192.168.10.8:5000'
  // baseURL: 'https://doc-sahab.herokuapp.com'
  // baseURL: 'http://192.168.0.106:5000'
});
// just run the ipconfig in cmd and change the IPv4 address here
