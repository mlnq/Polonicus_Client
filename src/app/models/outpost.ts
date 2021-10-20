export interface Outpost {
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
  export interface Chronicles {
    id: number;
    name: string;
    description: string;
    publicationDate: string;
  }
  