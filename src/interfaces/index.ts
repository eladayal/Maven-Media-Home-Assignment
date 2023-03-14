export interface Product {
  category: string;
  description: string;
  id: string;
  name: string;
  price: number;
  times: {
    availableDaysOfWeek: number[];
    excludeDates: { date: string }[];
    makeDays: number;
  };
}
