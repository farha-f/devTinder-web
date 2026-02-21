import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "./utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store?.connection);
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            console.log(res);
            dispatch(addConnection(res.data.data))
        } catch (err) {

        }
    }
    useEffect(() => {
        fetchConnections();
    }, []);
    if (!connections) return;
    if (connections?.length == 0) return <h1 className="text-bold text-2xl">No Connections found</h1>
    return (
        <>
            <div className="text-center my-10 ">
                <h1 className="text-bold text-white text-3xl">Connections</h1>
                {connections?.map((connection, index) => {
                    const { _id,firstName, lastName, skill, about, photo,age,gender } = connection;
                    return (

                        <div className="m-4 p-4  flex rounded-lg bg-base-300 w-1/2 mx-auto" key={_id}>
                            <div> <img alt="photo" className="w-20 h-20 rounded-full" src={photo} />
                                </div>
                           <div className="text-left mx-4">
                            <h2 className="font-bold">{firstName + " " + lastName}</h2>
                           { age && gender && <p>{age+ " "+gender}</p>}
                            <p>{about}</p>
                            <p>{skill}</p>
                            </div>
                        </div>


                    )
                })}
            </div>
        </>
    )
}
export default Connections;