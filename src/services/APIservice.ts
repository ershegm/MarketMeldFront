import Good from "../types/Good";
import Marketplace from "../types/Marketplace";
import User from "../types/User";
type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const API_BASE = 'http://localhost:8001';

const request = async (url: string, method: Methods = 'GET', body: any = null, headers = {'Content-Type': 'application/json'}) => {
    try {
        const response = await fetch(url, {method, body, headers});
        if (!response.ok) {
            throw new Error (`Couldn't fetch ${url}, status ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        throw err;
    }
};



export const getAllGoods: () => Promise<Good[]> = async () => {
    const res = await request(`${API_BASE}/goods`);
    return res.map((good: any) => {
        return {
            ...good,
            marketplace: Marketplace[good.marketplace]
        }
    });
};

export const getUser: (email: string, password: string) => Promise<User | null> = async (email, password) => {
    const res: User[] = await request(`${API_BASE}/users`);
    const user = res.find(user => user.email === email && user.password === password);
    if (user) {
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            favorites: user.favorites
        }
    } else {
        return null;
    }
}

export const addUser = async (user: User) => {
    const res = await request(`${API_BASE}/users`, 'POST', JSON.stringify(user));
    return res;
}

export const changeFavorite = async (userId: string, newFavorites: number[]) => {
    const res = await request(`${API_BASE}/users/${userId}`, 'PATCH', JSON.stringify({favorites: newFavorites}));
    return res;
}

export const updateUserInfo = async (user: User) => {
    const res = await request(`${API_BASE}/users/${user.id}`, 'PATCH', JSON.stringify(user));
    return res;
}




