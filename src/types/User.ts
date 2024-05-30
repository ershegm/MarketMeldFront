interface User {
    id: string;
    email: string;
    password?: string;
    name: string;
    surname: string;
    favorites: number[];
}

export default User;