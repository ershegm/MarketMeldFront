import './card.scss';
import star from '../../resources/img/star.svg';
import CardProps from './card.interface';
import Marketplace from '../../types/Marketplace';
import { useAuth } from '../Context/AuthProvider';
import { NavLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

function getMarketplaceAndClassName(marketplace: Marketplace) {
	switch (marketplace) {
		case Marketplace.WB:
			return { text: 'Wildberries', className: 'text-purple' };
		case Marketplace.OZON:
			return { text: 'Ozon', className: 'text-blue' };
		case Marketplace.YANDEX:
			return { text: 'ЯндексМаркет', className: 'text-yellow' };
		default:
			return { text: 'Неизвестный маркетплейс', className: '' };
	}
}

const Card = ({ cardId, name, price, marketplace, rating, feedback, link, imagePath, isFavorite }: CardProps) => {
	const { text: marketplaceName, className } = getMarketplaceAndClassName(marketplace);
	const { user, addFavorite, removeFavorite } = useAuth();
	const [favorite, setFavorite] = useState<boolean | null>(null);

	useEffect(() => {
		setFavorite(isFavorite);
	}, []);

	const clickHandlerAdd = useCallback(
		(id: number) => {
			addFavorite(id);
			setFavorite(true);
		},
		[addFavorite]
	);

	const clickHandlerRemove = useCallback(
		(id: number) => {
			removeFavorite(id);
			setFavorite(false);
		},
		[removeFavorite]
	);

	return (
		<article className="card">
			<a target="_blank" rel="noreferrer" href={link}>
				<img className="card__image" src={imagePath} alt={name} />
				<p className="card__name">
					{name}
				</p>
				<p className={'card__marketplace ' + className}>{marketplaceName}</p>
				<p className="card__price">{price + '₽'}</p>
				<div className="card__stats">
					<img className="card__star" src={star} alt="" />
					<p className="card__feedback">{`(${rating}) ${feedback} отзывов`}</p>
				</div>
			</a>

			{user ? (
				<button 
                    className={favorite ? 'card__button card__button_red' : 'card__button'} 
                    onClick={favorite ? () => clickHandlerRemove(cardId) : () => clickHandlerAdd(cardId)}>
					{favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
				</button>
			) : (
				<NavLink to={'/login'}>
					<button className="card__button">Добавить в избранное</button>
				</NavLink>
			)}
		</article>
	);
};

export default Card;
