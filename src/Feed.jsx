import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./utils/constants";
import { addFeed } from "./utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCards from "./UserCards";

const Feed=()=>{
    const feed= useSelector((store)=>store.feed);
    const dispatch= useDispatch();
    const getFeed= async()=>{
        if(feed?.length>0) return ;
       try{
        const res= await axios.get(BASE_URL+"/feed", {withCredentials:true});
        dispatch(addFeed(res.data))
       } catch(err){
        //to do
       }
    };
    useEffect(()=>{
        getFeed();
    },[])
return(
    feed && 
    <div className="flex justify-center my-10">
         <UserCards user={feed[0]}/>
    </div>
   
)
}
export default Feed;