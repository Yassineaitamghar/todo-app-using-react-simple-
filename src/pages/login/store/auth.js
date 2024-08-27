import axios from '../../../store/axios';
import createSlice from '../../../store/buildCreateSlice';
import Utils from '../../../common/utils';
import history from '../../../common/history';
import { logOut, setLogged } from '../../../store/user';

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      isLoadingLogin: false,
   },
   selectors: {
      selectAuth: state => state,
   },
   reducers: create => ({
      signIn: create.asyncThunk(
         async ({ username, password }, { dispatch }) => {
            try {
               const response = await axios.post('/auth/sign-in', {
                  username,
                  password,
               });
               Utils.setAccessToken(response.data.accessToken);
               dispatch(setLogged());
               return response.data;
            } catch (error) {
               console.log('asdsd');
               throw error;
            }
         },
         {
            pending: state => {
               state.isLoadingLogin = true;
            },
            fulfilled: (state, action) => {
               state.posts = action.payload;
            },
            settled: state => {
               state.isLoadingLogin = false;
            },
         },
      ),
      signOut: create.asyncThunk(async (_, { dispatch }) => {
         try {
            await axios.post('/auth/sign-out');
            Utils.removeAccessToken();
            dispatch(logOut());
            history.replace('/login');
         } catch (error) {
            console.log('asdsd');
            throw error;
         }
      }),
   }),
});

export const { signIn, signOut } = authSlice.actions;
export const { selectAuth } = authSlice.selectors;

export default authSlice.reducer;
