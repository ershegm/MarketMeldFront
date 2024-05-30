import { useState } from 'react';
import { useAuth } from '../../components/Context/AuthProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { login } = useAuth();

	return (
		<main className="login-layout">
			<form
				className="login"
				onSubmit={(event) => {
					event.preventDefault();
					login(email, password, () => navigate('/'));
				}}
			>
				<h1>Вход</h1>
				<input className="login__field" type="email" placeholder="Email" required value={email} onChange={(event) => setEmail(event.target.value)} />
				<input className="login__field" type="password" placeholder="Пароль" required value={password} onChange={(event) => setPassword(event.target.value)} />
				<button className="login__button" type="submit">
					ВОЙТИ
				</button>
				<NavLink to={'/registration'}>
					<p className="login__link">Регистрация</p>
				</NavLink>
			</form>
		</main>
	);
};

export default Login;
