import { NavLink, useNavigate } from 'react-router-dom';

import logo from '../../resources/img/logo.png';
import favorite from '../../resources/img/favorite.svg';
import profile from '../../resources/img/user.svg';
import './header.scss';
import HeaderProps from './header.interface';

const Header = ({ value, onChange, disabledSearch, user, readOnly }: HeaderProps) => {
	const navigate = useNavigate();
	return (
		<header className="header">
			<div className="container">
				<div className="header__inner">
					<NavLink to={'/'}>
						<img src={logo} alt="Logo" />
					</NavLink>

					<input
						readOnly={readOnly} 
                        className="header__search" 
                        type="search" name="search" 
                        id="search" 
                        placeholder="Найти на MarketMeld" 
                        value={value} onChange={onChange} 
                        onFocus={disabledSearch ? () => navigate('/') : undefined} 
                    />

					<div className="header__links">
						{user === null ? (
							<NavLink to={'/login'}>
								<img className="header__favorite" src={favorite} alt="Избранное" />
							</NavLink>
						) : (
							<NavLink to={'/favorites'}>
								<img className="header__favorite" src={favorite} alt="Избранное" />
							</NavLink>
						)}
						{user === null ? (
							<NavLink to={'/login'}>
								<img src={profile} alt="Личный кабинет" className="header__profile" />
							</NavLink>
						) : (
							<NavLink to={'/profile'}>
								<img src={profile} alt="Личный кабинет" className="header__profile" />
							</NavLink>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
