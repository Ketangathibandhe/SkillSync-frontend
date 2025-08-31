import {configureStore} from "@reduxjs/toolkit"
import  userReducer  from "./userSlice"
import skillReducer from './skillSlice'
const appStore = configureStore({
reducer: {
   user: userReducer,
   skill: skillReducer,
  },
})
export default appStore
