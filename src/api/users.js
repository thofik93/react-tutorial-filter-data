import axios from 'axios';

const get = (requests) => {
  let params = requests;
  const defaultParams = {
    results: 10,
    inc: 'gender,name,email,registered,login'
  }

  params = Object.assign(defaultParams, params);
  return axios.get(`https://randomuser.me/api`, { params });
};

export const Users = {
    get,
};
