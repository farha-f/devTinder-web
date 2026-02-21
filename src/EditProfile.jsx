import { useState } from "react";
import UserCards from "./UserCards";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import axios from "axios";
const EditProfile = ({user}) => {
    const[firstName , setFirstName] = useState(user?.firstName);
        const[lastName , setLastName] = useState(user?.lastName);
         const[age , setAge] = useState(user?.age);
         const[photo,setPhoto]=useState(user?.photo)
          const[gender , setGender] = useState(user?.skill);
        const[about, setAbout]= useState(user?.about);
        const[error,setError]=useState("");
        const dispatch=useDispatch();
        const saveProfile=async()=>{
            setError("");
            try{

                const res =await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,age,gender,about,photo},{withCredentials:true})
                dispatch(addUser(res?.data?.data))

            }catch(err){
                setError(err.response.data);
            }
            
        }
    return (
        <div className="flex justify-center my-10">

            <div className="flex justify-center mx-10">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Edit Profile</legend>
                    <div>
                    <label className="label">First Name</label>
                    <input type="First Name" className="input" placeholder="Email"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                    <label className="label">LastName</label>
                    <input type="Last Name" className="input" placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div>
                            <div>
                    <label className="label">Photo</label>
                    <input type="photo" className="input" placeholder="photo"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)} />
                        </div>
                    <label className="label">Age</label>
                    <input type="age" className="input" placeholder="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div>
                    <label className="label">gender</label>
                    <input type="gender" className="input" placeholder="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)} />
                        </div>
                        <div>
                    <label className="label">About</label>
                    <input type="about" className="input" placeholder="about"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)} />
                        </div>
                        <p className="text-red-500">{error}</p>
                    <button className="btn btn-neutral mt-4" onClick={saveProfile}>Save Profile</button>
                </fieldset>
            </div>
            <UserCards user={{firstName,lastName,age,gender,about,photo}}/>
        </div>
    )
}
export default EditProfile;