import User from "../../types/User";

interface Context {
	login: (email: string, password: string, callback: () => void) => void;
	register: (email: string, password: string, name: string, surname: string, callback: () => void) => void;
	addFavorite: (id: number) => void;
	removeFavorite: (id: number) => void;
	setUserFromSessionStorage: (JSONData: string) => void;
	updateUser : (email: string, name: string, surname: string, password?: string) => void;
	user: User | null;
	exitFromProfile: () => void; 
}

export default Context;