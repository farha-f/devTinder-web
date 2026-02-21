import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./userSlice"
import feedSlice from "./feedSlice";
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice";

const appStore=configureStore({
    reducer:{
        user:userSlice,
        feed:feedSlice,
        connection:connectionReducer,
        request:requestReducer

    },

});
export default appStore;