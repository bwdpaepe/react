import {
  axios
} from '.';

export const login = async (email, password) => {
  const {
    data
  } = await axios.post('users/login', {
    email,
    password
  });
  return data;
};

export const register = async ({
  name,
  email,
  password
}) => {
  const {
    data
  } = await axios.post('users/register', {
    name,
    email,
    password
  });
  return data;
};

export const getById = async (id) => {
  const {
    data
  } = await axios.get(`user/${id}`);
  return data;
}
