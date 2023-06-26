import { useNavigate } from 'react-router-dom';


function NotLoggedInPage() {
        const navigate = useNavigate()
        
        return <div className="flex flex-col">
            <h1 className="self-center text-center font-bold text-zinc-800 text-5xl mt-20">Для перегляду цієї сторінки потрібно увійти.</h1>
            <button className="self-center mt-8 flex-1 min-w-min max-w-max rounded-full bg-blue-600 text-white py-2 px-5 font-semibold hover:bg-blue-400" onClick={() => navigate('/login')}>Увійти</button>
        </div>
    }

export default NotLoggedInPage