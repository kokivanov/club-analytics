import { FormEvent } from "react";
import { APIWrapper } from "../services/api"
import { useNavigate } from "react-router-dom";

function RegisterPage({Wrapper} : {Wrapper : APIWrapper}) {

    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = e.target as typeof e.target & {
            email: { value: string };
            username: { value: string };
            password: { value: string };
            password2: { value: string };
          };

        if (data.password.value === data.password2.value) {
            Wrapper.register(data.email.value, data.password.value, data.username.value).then(() => navigate('/home'))
        } else alert("Паролі не співпадають")
    }

    return <form className='flex flex-col place-items-center' onSubmit={handleSubmit}>
        <div className="mt-3">
            <label className="text-xl font-bold">Пошта</label><br />
            <input type="email" name="email" className="border-2 text-2xl focus:border-blue-700"/>
        </div>
        <div className="mt-3">
            <label className="text-xl font-bold">Ім'я</label><br />
            <input type="username" name="username" className="border-2 text-2xl focus:border-blue-700"/>
        </div>
        <div className="mt-3">
            <label className="text-xl font-bold">Пароль</label><br />
            <input type="password" name="password" className="border-2 text-2xl focus:border-blue-700"/>
        </div>
        <div className="mt-3">
            <label className="text-xl font-bold">Повторити пароль</label><br />
            <input type="password" name="password2" className="border-2 text-2xl focus:border-blue-700"/>
        </div>


        <input type="submit" value="Зареєструватись" className="rounded-full bg-blue-700 hover:bg-blue-500 text-white text-2xl font-semibold px-7 py-2 mt-5"/>
    </form>

}

export default RegisterPage