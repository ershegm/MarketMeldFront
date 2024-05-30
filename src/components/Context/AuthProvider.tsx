import { createContext, useContext, useState } from 'react';
import { nanoid } from 'nanoid';

import User from '../../types/User';
import Context from './context.interface';
import { addUser, changeFavorite, getUser, updateUserInfo } from '../../services/APIservice';

const AuthContext = createContext<Context | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	const login = async (email: string, password: string, callback: () => void) => {
		try {
			const user = await getUser(email, password);
			if (user === null) {
				alert('Такого пользователя не существует!');
			} else {
				setUser(user);
				sessionStorage.setItem('userData', JSON.stringify(user));
				callback();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const register = async (email: string, password: string, name: string, surname: string, callback: () => void) => {
		try {
			const user: User = {
				id: nanoid(),
				email,
				password,
				name,
				surname,
				favorites: [],
			};

			await addUser(user);
			setUser(user);

			sessionStorage.setItem('userData', JSON.stringify(user));
			callback();
		} catch (err) {
			console.log(err);
		}
	};

	const addFavorite = async (id: number) => {
		if (user!.favorites.includes(id)) return;
		try {
			const newFavorites = [...user!.favorites, id];
			await changeFavorite(user!.id, newFavorites);

			setUser((prevState) => {
				if (prevState !== null) {
					return {
						...prevState,
						favorites: [...prevState.favorites, id],
					};
				}
				return null;
			});

			let oldSessionUser: User = JSON.parse(sessionStorage.getItem('userData')!);
			oldSessionUser = { ...oldSessionUser, favorites: newFavorites };
			sessionStorage.setItem('userData', JSON.stringify(oldSessionUser));
		} catch (err) {
			console.log(err);
		}
	};

	const exitFromProfile = () => {
		setUser(null);
	}

	const removeFavorite = async (id: number) => {
		try {
			const newFavorites = user!.favorites.filter((favoriteId) => favoriteId !== id);
			await changeFavorite(user!.id, newFavorites);

			setUser((prevState) => {
				if (prevState !== null) {
					return {
						...prevState,
						favorites: prevState.favorites.filter((favoriteId) => favoriteId !== id),
					};
				}
				return null;
			});

			let oldSessionUser: User = JSON.parse(sessionStorage.getItem('userData')!);
			oldSessionUser = { ...oldSessionUser, favorites: newFavorites };
			sessionStorage.setItem('userData', JSON.stringify(oldSessionUser));
		} catch (err) {
			console.log(err);
		}
	};

	const updateUser = async (email: string, name: string, surname: string, password?: string) => {
		try {
			const updatedUser: User = {
				id: user!.id,
				email,
				name,
				surname,
				favorites: [...user!.favorites]
			}
	
			if (password) {
				updatedUser.password = password;
			}
	
			await updateUserInfo(updatedUser);
	
			setUser((prevState) => {
				if (prevState !== null) {
					return {
						...prevState,
						...updatedUser
					};
				}
				return null;
			});
	
			let oldSessionUser: User = JSON.parse(sessionStorage.getItem('userData')!);
			oldSessionUser = { ...oldSessionUser, ...updatedUser };
			sessionStorage.setItem('userData', JSON.stringify(oldSessionUser));
		} catch(err) {
			console.log(err);
		}
	}

	const setUserFromSessionStorage = (JSONData: string) => {
		setUser(JSON.parse(JSONData));
	};

	return <AuthContext.Provider value={{ user, login, register, addFavorite, removeFavorite, setUserFromSessionStorage, updateUser, exitFromProfile }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export { useAuth, AuthProvider };
