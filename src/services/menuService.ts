import axios from 'axios';

export type Menu = {
  id?: number;
  name: string;
  prettyPrice: string;
  price: number;
};

const axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

const saveMenu = async (menu: Menu) => {
  const response = await axiosInstance.post<Menu>('/api/menus', menu);

  if (response.status !== 201) {
    throw new Error('Ocorreu um erro :(');
  }
};

const getAllMenu = async () => {
  const response = await axiosInstance.get<Menu[]>('/api/menus');

  if (response.status !== 200) {
    throw new Error('Ocorreu um erro :(');
  }

  return response.data;
};

export { saveMenu, getAllMenu };
