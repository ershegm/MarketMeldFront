import { useEffect, useState } from 'react';
import { getAllGoods } from '../../services/APIservice';
import { useAuth } from '../../components/Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Good from '../../types/Good';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import Marketplace from '../../types/Marketplace';
import Sorting from '../../types/Sorting';
import Select from 'react-select';
import filteringHandler from '../../utils/filteringHandler';

import { shopsOptions, sortingOptions } from '../../utils/filteringOptions';

const Favorites = () => {
	const [goods, setGoods] = useState<Good[]>([]);

	const [search, setSearch] = useState('');
	const [sorting, setSorting] = useState<Sorting | null>(null);
	const [marketplaces, setMarketplaces] = useState<Marketplace[]>(shopsOptions.map((opt) => opt.value));
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');

	const { user, setUserFromSessionStorage } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				let favoritesList: number[] = [];
				if (sessionStorage.getItem('userData') && user === null) {
					const sessionUser = sessionStorage.getItem('userData')!;
					setUserFromSessionStorage(sessionUser);
					favoritesList = JSON.parse(sessionUser).favorites;
				} else {
					favoritesList = user!.favorites;
				}

				let data = await getAllGoods();
				data = data.filter((good) => favoritesList.includes(good.id));

				const filteredData = filteringHandler(search, data, marketplaces, sorting, minPrice, maxPrice);

				setGoods(filteredData);
			} catch (error) {
				navigate('/login');
			}
		};
		fetchData();
	}, [navigate, setUserFromSessionStorage, user, marketplaces, minPrice, maxPrice, search, sorting]);

	return (
		<>
			<Header user={user} onChange={(event) => setSearch(event.target.value)} readOnly={false} value={search} disabledSearch={false} />
			<main>
				<div className="container">
					<form className="filters">
						<Select
							placeholder="Выберите маркетплейс"
							isMulti={true}
							options={shopsOptions}
							defaultValue={shopsOptions}
							onChange={(event) => {
								setMarketplaces(event.map((obj) => obj.value));
							}}
						/>
						<Select
							placeholder="Сортировка"
							options={sortingOptions}
							onChange={(event) => {
								setSorting(event!.value);
							}}
						/>

						<div className="filters__input">
							<label htmlFor="minPrice">От</label>
							<input
								value={minPrice}
								type="text"
								id="minPrice"
								placeholder="0₽"
								onChange={(event) => {
									if (/^\d+$/.test(event.target.value) || event.target.value === '') {
										setMinPrice(event.target.value);
									}
								}}
							/>
						</div>
						<div className="filters__input">
							<label htmlFor="maxPrice">До</label>
							<input
								value={maxPrice}
								type="text"
								id="minPrice"
								placeholder="99999₽"
								onChange={(event) => {
									if (/^\d+$/.test(event.target.value) || event.target.value === '') {
										setMaxPrice(event.target.value);
									}
								}}
							/>
						</div>
					</form>
					<section className="goods">
						{goods.length === 0 ? (
							<div>В избранном пока ничего нет</div>
						) : (
							goods.map((good) => {
								return <Card cardId={good.id} key={good.id} name={good.name} price={good.price} rating={good.rating} feedback={good.feedback} isFavorite={true} marketplace={good.marketplace} imagePath={'img/watch.png'} link={'#'} />;
							})
						)}
					</section>
				</div>
			</main>
		</>
	);
};

export default Favorites;
