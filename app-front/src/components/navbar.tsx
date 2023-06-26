import { Link, useNavigate } from 'react-router-dom';
import { APIWrapper } from '../services/api';
import { useEffect, useState } from 'react';

type ButtonProps = {
    to: string
    children?: JSX.Element | JSX.Element[] | string;
}

function NavBarButton(props: ButtonProps) {
        return <Link className="block py-2 pl-3 pr-4 text-blue-600 text-xl font-medium hover:text-blue-300" to={props.to}>{props.children}</Link>
    }

function NavBar({Wrapper} : {Wrapper : APIWrapper}) {
        const navigate= useNavigate()

        const [userName, setUserName] = useState(Wrapper.username)

        useEffect(() => {
            const updateUser = async () => {
                const user = await Wrapper.getMe()
                setUserName(user.username)
            }

            if (Wrapper.is_loggen_in)
                updateUser().catch((e) => {
                    console.log(Wrapper)
                    console.log("Виникла помилка")
                })
        })

        return <nav className="flex items-center justify-between py-4 px-16 border-b-2 border-blue-500 w-full relative z-10 mb-4">
            <h1 className="flex-2 text-3xl font-sans font-bold">Club-Analytics</h1>

            <div className="flex-4 flex items-center justify-between ">
                <NavBarButton to="/home">{"Домашня"}</NavBarButton>
                <NavBarButton to="/clubs">{"Спортивні зали"}</NavBarButton>
            </div>
            
            {Wrapper.is_loggen_in ?  <div className='flex flex-row'><p className='block py-2 pl-3 pr-4 text-blue-600 text-xl font-medium'>{userName}</p> <button className="flex-2 block rounded-full bg-blue-600 text-white py-2 px-5 font-semibold hover:bg-blue-400" onClick={() => {
                Wrapper.logout()
                navigate('/home')
                }}>Вийти</button></div>  : <button className="flex-2 block rounded-full bg-blue-600 text-white py-2 px-5 font-semibold hover:bg-blue-400" onClick={() => navigate('/login')}>Увійти</button>}
        </nav>
    }

export default NavBar