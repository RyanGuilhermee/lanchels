import axios from 'axios';
import type { Order } from './orderService';

type ReportRequest = {
  orders: Order[];
  calculatedData: {
    totalPixSales: number;
    totalMoneySales: number;
    totalSales: number;
    totalPixDonation: number;
    totalMoneyDonation: number;
    totalDonation: number;
    totalPix: number;
    totalMoney: number;
    total: number;
  };
};

export type ReportResponse = {
  status: number;
  url: string;
};

const baseURL = 'https://lanchels-backend.vercel.app';
// const baseURL = 'http://localhost:3000';

const axiosInstance = axios.create({ baseURL });

export const generateReport = async (reportData: ReportRequest) => {
  const response = await axiosInstance.post<ReportResponse>(
    '/api/data/generates-sales-summary-pdf',
    reportData
  );

  if (response.status !== 201) {
    throw new Error('Ocorreu um erro :(');
  }

  return `${baseURL}/${response.data.url}`;
};
