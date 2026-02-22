import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequests, removeRequest } from "./utils/requestSlice";

const Request=()=>{
    const request= useSelector((store)=>store.request);
    const dispatch= useDispatch();
    const fetchRequests=async()=>{
        try{
            const res= await axios.get(BASE_URL+"/user/requests/received", {withCredentials:true});
            console.log(res,"res");
            dispatch(addRequests(res?.data?.data));

        } catch(err){

        }
    }
    const requestReview=async(status, _id)=>{
        try{
            const res= await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
            dispatch(removeRequest(_id));
        }catch(err){

        }
    }
    useEffect(()=>{
        fetchRequests();
    },[]);
if (!request) return;
    if (request?.length == 0) return <h1 className="text-bold text-2xl flex justify-center">No request found</h1>
    return (
        <>
            <div className="text-center my-10 ">
                <h1 className="text-bold text-white text-3xl">Requests</h1>
                {request?.map((request, index) => {
                    const {_id ,firstName, lastName, skill, about, photo,age,gender } = request.fromUserId;
                    return (

                        <div className="m-4 p-4  flex rounded-lg bg-base-300 w-1/2 mx-auto justify-between items-center" key ={_id}>
                            <div> <img alt="photo" className="w-20 h-20 rounded-full" src={photo} />
                                </div>
                           <div className="text-left mx-4">
                            <h2 className="font-bold">{firstName + " " + lastName}</h2>
                           { age && gender && <p>{age+ " "+gender}</p>}
                            <p>{about}</p>
                            <p>{skill}</p>
                            </div>
                            <div>
                                <button className="btn btn-primary m-2" onClick={()=>requestReview("accepted",request._id)}>Accept</button>
                                <button className="btn btn-secondary m-2" onClick={()=>requestReview("rejected",request._id)}>Reject</button>
                                </div>
                        </div>


                    )
                })}
            </div>
        </>
    )
}
export default Request;