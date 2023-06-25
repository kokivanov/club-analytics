function RegisterPage() {
    return <form className='flex flex-col place-items-center'>
        <div className="mt-3">
            <label className="text-xl font-bold">Пошта</label><br />
            <input type="email" name="email" className="border-2 text-2xl focus:border-blue-700"/>
        </div>
        <div className="mt-3">
            <label className="text-xl font-bold">Ім'я</label><br />
            <input type="password" name="password" className="border-2 text-2xl focus:border-blue-700"/>
        </div>
        <div className="mt-3">
            <label className="text-xl font-bold">Прізвище</label><br />
            <input type="password" name="password" className="border-2 text-2xl focus:border-blue-700"/>
        </div>
        <div className="mt-3">
            <label className="text-xl font-bold">Пароль</label><br />
            <input type="password" name="password" className="border-2 text-2xl focus:border-blue-700"/>
        </div>
        <div className="mt-3">
            <label className="text-xl font-bold">Повторити пароль</label><br />
            <input type="password" name="password" className="border-2 text-2xl focus:border-blue-700"/>
        </div>


        <input type="submit" value="Зареєструватись" className="rounded-full bg-blue-700 hover:bg-blue-500 text-white text-2xl font-semibold px-7 py-2 mt-5"/>
    </form>

}

export default RegisterPage