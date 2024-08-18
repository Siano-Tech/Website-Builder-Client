import axios from 'axios';

// Default Axis Endpoint for all the requests
if(window.location.hostname.includes('localhost')) {
    axios.defaults.baseURL = 'http://192.168.0.101:5000';
    // axios.defaults.baseURL = 'http://192.168.31.243:5000';
} else {
    axios.defaults.baseURL = 'https://website-builder-server.vercel.app';
}