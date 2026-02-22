import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { removeUserFromFeed } from "./utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCards = ({user}) => {
    const {_id,firstName,lastName,photo,about,skill,age}= user;
    console.log(user,"user in card");
    const dispatch=useDispatch();
    const handleRequest=async(status, _id)=>{
        try{
            const res= await axios.post(BASE_URL+"/request/send/"+ status+"/"+_id,{},{withCredentials:true});
            dispatch(removeUserFromFeed(_id));
        }catch(err){}
    }
    // if(!user) return;
    // if(user.length==0) return <h1 className="text-bold text-2xl flex justify-center">No user found</h1>
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={photo}
                    alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName+' '+lastName}</h2>
                <p>{about}</p>
                <p>{age}</p>
                <p>{skill}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-secondary" onClick={()=>handleRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-primary"onClick={()=>handleRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}
export default UserCards;