import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./userSlice"
import feedSlice from "./feedSlice";
import connectionReducer from "./connectionSlice"

const appStore=configureStore({
    reducer:{
        user:userSlice,
        feed:feedSlice,
        connection:connectionReducer

    },

});
export default appStore;