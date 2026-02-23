import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants"
const Login = () => {
    const [email, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login",
                {
                    email,
                    password
                },
                { withCredentials: true }
            );
            console.log(res, "res");
            dispatch(addUser(res.data));
            return navigate("/");
        } catch (err) {
            setError(err?.response?.data)
            console.log(err?.response?.message);
        }
    }
    const handleSignUp = async () => {
        try{
            const res= await axios.post(BASE_URL+ "/signup", {firstName, lastName, email, password},{withCredentials:true});
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        }catch(err){
            setError(err?.response?.data || "Something went wrong");
        }
    }
    return (
        <>
            <div className="flex justify-center my-10">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">{isLoginForm? "Login" : "Sign Up"}</legend>
                     {!isLoginForm && <> <div>
                        <label className="label">FirstName</label>
                        <input type="text" className="input" placeholder="FirstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </div><div>
                            <label className="label">LastName</label>
                            <input type="text" className="input" placeholder="LastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} />
                        </div></>}
                    <div>
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email"
                            value={email}
                            onChange={(e) => setEmailId(e.target.value)} />
                    </div>

                    <div>
                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <p className="text-red-500">{error}</p>
                    <button className="btn btn-neutral mt-4" onClick={isLoginForm? handleLogin : handleSignUp}>{isLoginForm? "Login" : "Sign Up"}</button>
                    <p className="m-auto  cursor-pointer" onClick={()=>setIsLoginForm((value)=>!value)}>{
                        isLoginForm? "Don't have an account? Sign Up" : "Already have an account? Login"
                        }</p>
                </fieldset>
            </div>
        </>
    )
}
export default Login;