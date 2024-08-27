import createSlice from '../../../store/buildCreateSlice';
import axios from '../../../store/axios';

const usersSlice = createSlice({
   name: 'users',
   initialState: {
      users: [],
      pagination: null,
      status: 'idle',
      error: null,
      isGetting: true,
      isDeleting: false,
      isCreating: false,
      total: 0,
   },
   selectors: {
      selectPosts: state => state,
   },
   reducers: create => ({
      UsersData: create.asyncThunk(
         async ({ page, limit }, thunkApi) => {
            try {
               const response = await axios.get('/user/all', {
                  params: {
                     page,
                     limit,
                  },
               });
               return response.data;
            } catch (err) {
               throw thunkApi.rejectWithValue({
                  error: 'Oh no, not again!',
               });
            }
         },
         {
            pending: state => {
               state.isGetting = true;
            },
            fulfilled: (state, { payload }) => {
               state.users = payload;
               // state.pagination = rest;
            },
            settled: state => {
               state.isGetting = false;
            },
         },
      ),
      UsersDelete: create.asyncThunk(
         async id => {
            await axios.delete(`/user/${id}/delete`);
            return id;
         },
         {
            pending: state => {
               state.isDeleting = true;
            },
            fulfilled: (state, action) => {
               const index = state.users.findIndex(user => user.id === action.meta.arg);
               state.users.splice(index, 1);
            },
            settled: state => {
               state.isDeleting = false;
            },
         },
      ),
      UserAdd: create.asyncThunk(
         async (newUser, thunkApi) => {
            try {
               const response = await axios.post('/user/add', newUser);
               return response.data;
            } catch (err) {
               throw thunkApi.rejectWithValue({
                  error: 'Oh no, not again!',
               });
            }
         },
         {
            pending: state => {
               state.isCreating = true;
            },
            fulfilled: (state, action) => {
               state.users.unshift(action.payload);
            },
            settled: state => {
               state.isCreating = false;
            },
         },
      ),
   }),
});

export const { UsersDelete, UsersData, UserAdd } = usersSlice.actions;
export const { selectPosts } = usersSlice.selectors;

export default usersSlice.reducer;
