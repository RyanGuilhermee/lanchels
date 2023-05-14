export type Menu = {
  name: string;
  prettyPrice: string;
  price: number;
};

const saveMenu = async (menu: Menu) => {
  localStorage.setItem('menu', JSON.stringify(menu));

  return Promise.resolve();
};

const getMenu = () => {
  const menu = localStorage.getItem('menu');

  return Promise.resolve(JSON.parse(menu as string) as Menu);
};

export { saveMenu, getMenu };
