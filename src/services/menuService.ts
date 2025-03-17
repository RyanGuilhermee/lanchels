import axios from 'axios';

export type Menu = {
  id?: string;
  name: string;
  prettyPrice: string;
  price: number;
};

// const axiosInstance = axios.create({ baseURL: 'https://lanchels-backend.vercel.app' });
const axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

const saveMenu = async (menu: Menu) => {
  const response = await axiosInstance.post<Menu>('/api/menus', menu);

  if (response.status !== 201) {
    throw new Error('Ocorreu um erro :(');
  }
};

const getAllMenu = async () => {
  const menusCache = getAllMenuCache();

  try {
    const response = await axiosInstance.get<Menu[]>('/api/menus');

    saveMenuCache(response.data);

    return response.data;
  } catch (error) {
    return menusCache;
  }
};

const getMenuById = async (id: string) => {
  const response = await axiosInstance.get<Menu>(`/api/menus/${id}`);

  return response.data;
};

const updateMenu = async (id: string, menu: Menu) => {
  const response = await axiosInstance.patch(`/api/menus/${id}`, menu);

  return response.data;
};

const deleteMenu = async (id: string) => {
  const response = await axiosInstance.delete<string>(`/api/menus/${id}`);

  return response.data;
};

const saveMenuCache = (menu: Menu[]) => {
  localStorage.setItem('menus', JSON.stringify(menu));
};

const getAllMenuCache = () => {
  const menus: Menu[] = JSON.parse(localStorage.getItem('menus') as string);

  return menus;
};

export { saveMenu, getAllMenu, getMenuById, updateMenu, deleteMenu };
