import axios from '../../../store/axios';
import createSlice from '../../../store/buildCreateSlice';
import Utils from '../../../common/utils';
import { setLogged } from '../../../store/user';

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isLoadingLogin: false,
   },
   selectors: {
      selectAuth: state => state,
   },
   reducers: create => ({
      signUp: create.asyncThunk(
         async ({ username, password, name, passwordConfirmation }, { dispatch }) => {
            try {
               const response = await axios.post('/auth/sign-up', {
                  name,
                  username,
                  password,
                  passwordConfirmation,
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
               state.user = action.payload;
               state.isLoadingLogin = false;
            },
            settled: state => {
               state.isLoadingLogin = false;
            },
         },
      ),
   }),
});

export const { signUp } = authSlice.actions;
export const { selectAuth } = authSlice.selectors;

export default authSlice.reducer;
