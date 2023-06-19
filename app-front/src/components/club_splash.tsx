import { useNavigate } from "react-router-dom";

function ClubsSplash({c_name, c_id} : {c_name : string, c_id : string}) {
    const navigate = useNavigate()
    return <div className="flex self-center mb-5 min-w-1/2 max-w-[70%] shadow-md border-4 border-blue-200 hover:border-blue-400 rounded-md w-full">
        <div className="flex flex-auto justify-left m-5 place-items-center">
            <label className="text-4xl text-center">{c_name}</label>
        </div>
        <div className="flex flex-auto place-content-end m-5">
            <button className="hover:bg-blue-300 m-2 py-3 px-5 rounded-full bg-blue-500 text-white font-bold" onClick={() => navigate('/clubs/' + c_id)}>View</button>
        </div>
    </div>
}

export default ClubsSplash