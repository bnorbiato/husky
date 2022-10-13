export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contacts: Contact[];
}

export interface Contact {
    id: number;
    name: string;
    personId: number;
    types: Type[];
}

export interface Type {
    id: number;
    title: string;
    content: string;
    contactId: number;
}
