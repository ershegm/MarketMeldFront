import { useState } from "react";
import { useAuth } from "../../components/Context/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();



  
  return (
    <main className="login-layout">
        <form className="login" onSubmit={event => {
            event.preventDefault();
            register(email, password, name, surname, () => navigate('/'));
        }}>
            <h1>Регистрация</h1>
            <input
                 className="login__field"
                 type="email"
                 placeholder="Email"
                 required
                 value={email}
                 onChange={event => setEmail(event.target.value)}
            />
            <input 
                className="login__field"
                type="password" 
                placeholder="Пароль"
                required 
                value={password}
                onChange={event => setPassword(event.target.value)}
            />
            <input 
                className="login__field"
                type="text" 
                placeholder="Имя"
                required 
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <input 
                className="login__field"
                type="text" 
                placeholder="Фамилия"
                required 
                value={surname}
                onChange={event => setSurname(event.target.value)}
            />
            <button className="login__button" type="submit">Регистрация</button>
            <NavLink to={'/login'}><p className="login__link">Войти</p></NavLink>
        </form>
    </main>
  )
}

export default Register;