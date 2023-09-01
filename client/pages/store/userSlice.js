import { createSlice } from '@reduxjs/toolkit'

const initiaState = {
    user: {
        member_id :'',
        email:'',
        name:'',
        birthday:'',
        phone:'',
        address:'',
    },  
}

const userSlice = createSlice({
    name:'user',
    initialState: initiaState,
    reducers:{
        setuserData(state,action){
            state.user = action.payload
        },
        //初始化使用者
        resetuser: () => initiaState,
    }
})

export const {
    setuserData,resetuser,
  } = userSlice.actions
  export default userSlice.reducer