import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../components/Context/AuthProvider';
import Header from '../../components/Header/Header';

import './profile.scss';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
	const { user, setUserFromSessionStorage, updateUser, exitFromProfile } = useAuth();
    const [disabled, setDisabled] = useState(true);
    const [modal, setModal] = useState(false);

    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);
    const surnameInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!sessionStorage.getItem('userData')) {
            navigate('/login');
            return;
        }

        if (sessionStorage.getItem('userData') && user === null) {
            const userData = sessionStorage.getItem('userData')!;
            setUserFromSessionStorage(userData);
        }
    }, [])

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setModal(true);

    }

    const updateData = () => {
        const emailInputValue = emailInput.current!.value;
        const passwordInputValue = passwordInput.current!.value;
        const nameInputValue = nameInput.current!.value;
        const surnameInputValue = surnameInput.current!.value;

        if (passwordInputValue === '') {
            updateUser(emailInputValue, nameInputValue, surnameInputValue);
            setDisabled(true);
            setModal(false);
        } else {
            updateUser(emailInputValue, nameInputValue, surnameInputValue, passwordInputValue);
            setDisabled(true);
            setModal(false);
        }
    }

    const exit = () => {
        exitFromProfile();
        sessionStorage.removeItem('userData');
        navigate('/');
    }


	return (
		<>
			<Header 
                readOnly={true}
                onChange={undefined} 
                value={''} 
                user={user}
                disabledSearch={true} 
            />
            <main className="profile">
                <div className="container">
                    <h1 className='profile__heading'>Ваш профиль</h1>
                    <form onSubmit={submitHandler} className='profile__data'>
                        <div>
                            <label className='profile__label' htmlFor="email">Email</label>
                            <input
                                defaultValue={user?.email}
                                required 
                                className='profile__input' 
                                id='email' 
                                type="email"
                                ref={emailInput}
                                onChange={e => setDisabled(false)}
                            />
                        </div>

                        <div>
                            <label className='profile__label' htmlFor="password">Пароль</label>
                            <input 
                                className='profile__input' 
                                id='password' 
                                type="password"
                                ref={passwordInput}
                                onChange={e => setDisabled(false)}
                            />
                        </div>

                        <div>
                            <label className='profile__label' htmlFor="name">Имя</label>
                            <input 
                                required
                                className='profile__input' 
                                id='name' 
                                type="text" 
                                defaultValue={user?.name}
                                ref={nameInput}
                                onChange={e => setDisabled(false)}
                            />
                        </div>

                        <div>
                            <label className='profile__label' htmlFor="surname">Фамилия</label>
                            <input 
                                required
                                className='profile__input' 
                                id='surname' 
                                type="text"
                                defaultValue={user?.surname}
                                ref={surnameInput}
                                onChange={e => setDisabled(false)}
                            />
                        </div>



                        <button disabled={disabled} className='profile__button' type='submit'>Обновить данные</button>
                        <button onClick={event => exit()} className='profile__button profile__button_red'>Выйти</button>
                    </form>
                </div>

                <div className={modal ? "modal" : "modal modal_disabled"}>
                    <div className="modal__inner">
                        <p>Вы действительно хотите изменить данные?</p>
                        
                        <div className="modal__group">
                            <button className='modal__button' onClick={event => updateData()}>Да</button>
                            <button className='modal__button' onClick={e => setModal(false)}>Нет</button>
                        </div>
                    </div>
                </div>
            </main>
		</>
	);
};

export default Profile;
