import axios from 'axios';

export const getStarted = async () => {
    try {
      const response = await axios.get('/api/clinic/banners');
      // console.log('Banners Response : ', response.data);
      return { data: response.data, status: response.status };
    } catch (error) {
      return { data: error.data ?? error.response.data, status: error.status }
    }
};


export const submitForm = async (formData) => {
    try {
      const response = await axios.post('/api/users/registerGuest', formData);
      // console.log('Registered user response : ', response.data);
      return { data: response.data, status: response.status };
    } catch (error) {
      return { data: error.data ?? error.response.data, status: error.status }
    }
};