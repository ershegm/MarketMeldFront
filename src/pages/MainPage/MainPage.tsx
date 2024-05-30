import Select from 'react-select';
import Marketplace from '../../types/Marketplace';
import Card from '../../components/Card/Card';
import { getAllGoods } from '../../services/APIservice';
import Good from '../../types/Good';
import Sorting from '../../types/Sorting';

import filteringHandler from '../../utils/filteringHandler';
import { shopsOptions, sortingOptions } from '../../utils/filteringOptions';

import './mainPage.scss';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../components/Context/AuthProvider';
import Header from '../../components/Header/Header';

const MainPage = () => {
	const { user, setUserFromSessionStorage } = useAuth();

	// Состояние списка товаров
	const [goods, setGoods] = useState<Good[]>([]);
	const [loadingLimit, setLoadingLimit] = useState(8);

	// Состояние фильтров
	const [search, setSearch] = useState('');
	const [sorting, setSorting] = useState<Sorting | null>(null);
	const [marketplaces, setMarketplaces] = useState<Marketplace[]>(shopsOptions.map((opt) => opt.value));
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');

	const handleGoodsLoading = useCallback(async () => {
		try {
			let data = await getAllGoods();
			const filteredData = filteringHandler(search, data, marketplaces, sorting, minPrice, maxPrice, loadingLimit)
			setGoods(filteredData);
		} catch (error) {
			console.error('Ошибка при загрузке товаров:', error);
		}
	}, [loadingLimit, marketplaces, maxPrice, minPrice, search, sorting]);

	useEffect(() => {
		if (user === null && sessionStorage.getItem('userData')) {
			setUserFromSessionStorage(sessionStorage.getItem('userData')!);
		}
		handleGoodsLoading();
	}, [handleGoodsLoading, setUserFromSessionStorage, user]);

	return (
		<>
			<Header 
				user={user} 
				value={search} 
				onChange={(event) => setSearch(event.currentTarget.value)}
				readOnly={false} 
				disabledSearch={false} 
				/>

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
							styles={
								{
									control: (base) => ({
										...base,
										borderRadius: '15px',
									}),
								}
							}
						/>
						<Select
							placeholder="Сортировка"
							options={sortingOptions}
							onChange={(event) => {
								setSorting(event!.value);
							}}
							styles={
								{
									control: (base) => ({
										...base,
										borderRadius: '15px',
									}),
								}
							}
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
							<div>К сожалению, ничего не нашлось :( </div>
						) : (
							goods.map((good) => {
								return <Card 
                                    cardId={good.id}
                                    key={good.id}
									name={good.name} 
                                    price={good.price} 
                                    marketplace={good.marketplace} 
                                    rating={good.rating} 
                                    feedback={good.feedback} 
                                    link={good.link} 
                                    imagePath={good.imageUrl} 
                                    isFavorite={!!user?.favorites.includes(good.id)} 
                                />;
							})
						)}
					</section>

					<div className="button-container">
						{loadingLimit > goods.length ? null : (
							<button
								onClick={() => {
									setLoadingLimit((prevState) => prevState + 8);
									handleGoodsLoading();
								}}
								className="load-more"
							>
								Загрузить еще
							</button>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default MainPage;
