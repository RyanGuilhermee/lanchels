export type Menu = {
  id?: number;
  name: string;
  prettyPrice: string;
  price: number;
};

const saveMenu = async (menu: Menu) => {
  try {
    const data = await getMenu();

    menu.id = data[data.length - 1].id! + 1;

    data.push(menu);

    localStorage.setItem('menu', JSON.stringify(data));

    return Promise.resolve();
  } catch (error) {
    menu.id = 0;
    localStorage.setItem('menu', JSON.stringify([menu]));
  }
};

const getMenu = () => {
  const menu = localStorage.getItem('menu');

  if (!menu) {
    return Promise.reject(null);
  }

  return Promise.resolve(JSON.parse(menu as string) as Menu[]);
};

export { saveMenu, getMenu };
