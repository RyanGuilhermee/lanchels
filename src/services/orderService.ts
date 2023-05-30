export type Order = {
  id?: number;
  customerName: string;
  snacks: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    quantityPaid: number;
    paymentMethod: string;
    isPaid: boolean;
  }[];
  totalValue: number;
  totalPaid: number;
  totalDebt: number;
  donation: {
    totalDonation: number;
    donationMethod: string;
  };
  observations: string;
};

const saveOrder = async (order: Order) => {
  try {
    const data = await findAllOrders();

    order.id = data[data.length - 1].id! + 1;

    data.push(order);

    localStorage.setItem('order', JSON.stringify(data));

    return Promise.resolve();
  } catch (error) {
    order.id = 0;
    localStorage.setItem('order', JSON.stringify([order]));
  }
};

const updateOrder = async (id: string, newOrder: Order) => {
  try {
    const orders = await findAllOrders();

    newOrder.id = Number(id);

    orders.splice(Number(id), 1, newOrder);

    localStorage.setItem('order', JSON.stringify(orders));

    return Promise.resolve('Updated successfully!');
  } catch (error) {
    return Promise.resolve('Something went wrong');
  }
};

const findOrder = async (id: string) => {
  try {
    const orders = await findAllOrders();

    const order = orders.find((order, index) => index === Number(id));

    if (!order) {
      return Promise.reject('Order not found');
    }

    return Promise.resolve(order);
  } catch (error) {
    console.log(error);
  }
};

const findAllOrders = () => {
  const orders = localStorage.getItem('order');

  if (!orders) {
    return Promise.reject(null);
  }

  return Promise.resolve(JSON.parse(orders as string) as Order[]);
};

const deleteAllOrders = () => {
  localStorage.removeItem('order');

  return Promise.resolve();
};

export { saveOrder, findOrder, findAllOrders, updateOrder, deleteAllOrders };
