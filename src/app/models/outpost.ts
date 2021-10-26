import Chronicles from "./chronicle";

export interface Outpost{
    id: number;
    name: string;
    description: string;
    population: number;
    category: string;
    city: string;
    street: string;
    postalCode: string;
    chronicles?: (Chronicles)[] | null;
  }

