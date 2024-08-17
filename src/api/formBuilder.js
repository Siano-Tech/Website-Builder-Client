import axios from 'axios';

export const getBanners = async () => {
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
      const response = await axios.post('/api/clinic/saveForm', formData);
      // console.log('Saved Form Response : ', response.data);
      return { data: response.data, status: response.status };
    } catch (error) {
      return { data: error.data ?? error.response.data, status: error.status }
    }
};

export const getClinicData = async (id) => {
  try {
    const response = await axios.post('/api/clinic/clinicData', {id});
    // console.log('Clinic Data Response : ', response.data);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.data ?? error.response.data, status: error.status }
  }
};