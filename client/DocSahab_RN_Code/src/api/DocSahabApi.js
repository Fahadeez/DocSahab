import axios from 'axios';

export default axios.create({
    // just run the ipconfig in cmd and change the IPv4 address here
    baseURL: 'http://192.168.1.104:5000'
});