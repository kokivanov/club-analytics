import { FormEvent } from "react";
import { useNavigate } from "react-router-dom"
import { APIWrapper } from "../services/api";
import { AxiosError } from "axios";

function LoginPage({Wrapper} : {Wrapper: APIWrapper}) {

    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        

        const data = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
          };

        Wrapper.login(data.email.value, data.password.value).catch((e) => {
            console.log(e)
            if (e instanceof AxiosError)
                if (e.message.split(' ').at(-1) === '403') alert("Неправильний логін чи пароль")
                if (e.message.split(' ').at(-1) === '401') alert("Виникла помилка при авторизації")
        }).then((e) => navigate('/home'))
    }

    return <form className='flex flex-col place-items-center' onSubmit={handleSubmit}>
        <div className="mt-3">
            <label className="text-xl font-bold">Пошта</label><br />
            <input type="email" name="email" className="border-2 text-2xl focus:border-blue-700"/>
        </div>
        <div className="mt-3">
            <label className="text-xl font-bold">Пароль</label><br />
            <input type="password" name="password" className="border-2 text-2xl focus:border-blue-700"/>
        </div>

        <input type="submit" value="Увійти" className="rounded-full bg-blue-700 hover:bg-blue-500 text-white text-2xl font-semibold px-7 py-2 mt-5"/>
        <a href={'/register'} onClick={(e) => {e.preventDefault(); navigate('/register')}} className="cursor-pointer text-blue-600 mt-2">Зареєструватись</a>    
    </form>
}

export default LoginPage