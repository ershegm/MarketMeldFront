import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './components/Context/AuthProvider';

import MainPage from './pages/MainPage/MainPage';
import Favorites from './pages/Favorites/Favorites';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/login" element={<Login />} />
					<Route path="/registration" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
