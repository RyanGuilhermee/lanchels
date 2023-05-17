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
  totalPayed: number;
  totalDebt: number;
  observations: string;
};
