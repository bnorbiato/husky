export interface Person {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  contacts: Contact[];
}

export interface Contact {
  id: number;
  name: string;
  person: string;
  types: Type[];
}

export interface Type {
  id: number;
  title: string;
  content: string;
  contact: number;
}
