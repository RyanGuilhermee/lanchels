export type Order = {
  id?: number;
  customerName: string;
  snacks: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    quantityPayed: number;
    paymentMethod: string;
    isPayed: boolean;
  }[];
  totalValue: number;
  totalPayed: number;
  totalDebt: number;
  observations: string;
};
