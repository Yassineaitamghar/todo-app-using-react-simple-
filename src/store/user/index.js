import createSlice from '../buildCreateSlice';
import axios from '../../store/axios';
import Utils from '../../common/utils.js';
import history from '../../common/history.js';
import { serialize } from 'object-to-formdata';

const initialState = {
   user: null,
   isGetting: !!Utils.getAccessToken(),
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   selectors: {
      selectUser: state => state,
   },
   reducers: create => ({
      logOut: () => ({
         ...initialState,
         isGetting: false,
      }),
      getUserInfo: create.asyncThunk(
         async (token, thunkApi) => {
            try {
               const response = await axios.get('/user', {
                  headers: {
                     ...(token && {
                        Authorization: `Bearer ${token}`,
                     }),
                  },
               });

               if (token) {
                  Utils.setAccessToken(token);
               }

               return response.data;
            } catch (err) {
               if (!err.response) {
                  throw err;
               }

               Utils.removeAccessToken();
               thunkApi.dispatch({ type: 'logOut' });
               history.push('/login');

               throw thunkApi.rejectWithValue({
                  error: 'Oh no, not again!',
               });
            }
         },
         {
            pending: state => {
               state.isGetting = true;
            },
            fulfilled: (state, action) => {
               state.user = action.payload;
            },
            settled: state => {
               state.isGetting = false;
            },
         },
      ),
      updateUser: create.asyncThunk(
         async body => {
            await axios.put(`/user/update`, body);
            return body;
         },
         {
            pending: state => {
               state.isUpdating = true;
            },
            fulfilled: (state, action) => {
               state.user.name = action.payload.name;
            },
            settled: state => {
               state.isUpdating = false;
            },
         },
      ),
      updateUserPhoto: create.asyncThunk(
         async body => {
            await axios.patch('/user/picture', serialize(body));
            return body;
         },
         {
            pending: state => {
               state.isCreating = true;
            },
            fulfilled: (state, action) => {
               state.user.picturePath = URL.createObjectURL(action.payload.picture);
            },
            settled: state => {
               state.isCreating = false;
            },
         },
      ),
      updateCoverPhoto: create.asyncThunk(
         async body => {
            await axios.patch('/user/cover', serialize(body));
            return body;
         },
         {
            pending: state => {
               state.isCreating = true;
            },
            fulfilled: (state, action) => {
               state.user.coverPath = URL.createObjectURL(action.payload.picture);
            },
            settled: state => {
               state.isCreating = false;
            },
         },
      ),
   }),
});

export const { getUserInfo, editUser, updateUser, updateUserPhoto, logOut, setLogged, updateCoverPhoto } =
   userSlice.actions;
export const { selectUser } = userSlice.selectors;

export default userSlice.reducer;
