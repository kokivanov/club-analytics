import { useEffect, useState } from 'react';
import ClubsSplash from './club_splash';
import { PaginizedClubInfoEntity } from '../services/entities/clubsList.entity';
import { APIWrapper, SERVER_ERROR } from '../services/api';
import NotLoggedInPage from './notLoggedIn';
function ClubsPage({Wrapper} : {Wrapper: APIWrapper}) {

    const [clubList, setClubList] = useState(new PaginizedClubInfoEntity({}))



    useEffect(() => {
        const getClubs = async () => {
            const resp = await Wrapper.getClubs()
            setClubList(resp)
        }

        getClubs().catch(e => {
            if (e instanceof Error)
                if (e.message === SERVER_ERROR) alert('Виникла помилка при обробці запиту')
        })
    }, [Wrapper])

    
    if (Wrapper.is_loggen_in)
        return <div className='flex flex-col'>
            {clubList.data && clubList.data.length > 0  ? clubList.data.map((el) => {
                return <ClubsSplash key={el.id.toString()} c_name={el.name} c_id={el.id.toString()}/>
            }) : <div>
                    <h1 className="self-center text-center font-bold text-zinc-800 text-4xl mt-20">Тут поки нічого немає.</h1>
                </div>}
        </div>
    else
        return <NotLoggedInPage/>

}

export default ClubsPage