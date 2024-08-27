// import createSlice from '../../../store/buildCreateSlice';
// import axios from '../../../store/axios';
// import { serialize } from 'object-to-formdata';
//
// const postsSlice = createSlice({
//    name: 'posts',
//    initialState: {
//       posts: [],
//       pagination: null,
//       status: 'idle',
//       error: null,
//       isCreating: false,
//       isUpdating: false,
//       isGetting: true,
//       isDeleting: false,
//       total: 0,
//    },
//    selectors: {
//       selectPosts: state => state,
//    },
//    reducers: create => ({
//       editTodo: create.reducer((state, action) => {
//          const { id, updatedTodo } = action.payload;
//          const existingTodo = state.posts.find(todo => todo.id === id);
//          if (existingTodo) {
//             existingTodo.title = updatedTodo.title;
//             existingTodo.body = updatedTodo.body;
//          }
//       }),
//       fetchTodoData: create.asyncThunk(
//          async ({ page, limit }, thunkApi) => {
//             try {
//                const response = await axios.get('/employees', {
//                   params: {
//                      page,
//                      limit,
//                   },
//                });
//                return response.data;
//             } catch (err) {
//                throw thunkApi.rejectWithValue({
//                   error: 'Oh no, not again!',
//                });
//             }
//          },
//          {
//             pending: state => {
//                state.isGetting = true;
//             },
//             fulfilled: (state, { payload: { data, ...rest } }) => {
//                state.posts = data;
//                state.pagination = rest;
//             },
//             settled: state => {
//                state.isGetting = false;
//             },
//          },
//       ),
//       fetchEditTodo: create.asyncThunk(
//          async ({ id, updatedTodo }) => {
//             const response = await axios.put(`/employees/${id}/edit`, updatedTodo);
//             return { id, updatedTodo: response.data };
//          },
//          {
//             pending: state => {
//                state.isUpdating = true;
//             },
//             fulfilled: (state, action) => {
//                const { id, updatedTodo } = action.payload;
//                const existingTodoIndex = state.posts.findIndex(todo => todo.id === id);
//
//                if (existingTodoIndex !== -1) {
//                   state.posts = [
//                      ...state.posts.slice(0, existingTodoIndex),
//                      { ...state.posts[existingTodoIndex], ...updatedTodo },
//                      ...state.posts.slice(existingTodoIndex + 1),
//                   ];
//                }
//             },
//             settled: state => {
//                state.isUpdating = false;
//             },
//          },
//       ),
//       fetchAddTodo: create.asyncThunk(
//          async (newTodo, thunkApi) => {
//             try {
//                await axios.post('/employees/add', newTodo);
//             } catch (err) {
//                throw thunkApi.rejectWithValue({
//                   error: 'Oh no, not again!',
//                });
//             }
//          },
//          {
//             pending: state => {
//                state.isCreating = true;
//             },
//             fulfilled: (state, action) => {
//                state.posts.unshift(action.payload);
//             },
//             settled: state => {
//                state.isCreating = false;
//             },
//          },
//       ),
//       fetchAddPhoto: create.asyncThunk(
//          async ({ id, picture }, { dispatch }) => {
//             await axios.patch(
//                `/employees/${id}/picture`,
//                serialize({
//                   picture,
//                }),
//             );
//             // return response.data;
//             dispatch(fetchTodoData());
//          },
//          {
//             pending: state => {
//                state.isCreating = true;
//             },
//             fulfilled: (state, action) => {
//                // state.posts.unshift(action.payload);
//             },
//             settled: state => {
//                state.isCreating = false;
//             },
//          },
//       ),
//       fetchDeleteTodo: create.asyncThunk(
//          async id => {
//             await axios.delete(`/employees/${id}/delete`);
//             return id;
//          },
//          {
//             pending: state => {
//                state.isDeleting = true;
//             },
//             fulfilled: (state, action) => {
//                const index = state.posts.findIndex(todo => todo.id === action.meta.arg);
//                state.posts.splice(index, 1);
//             },
//             settled: state => {
//                state.isDeleting = false;
//             },
//          },
//       ),
//    }),
//    extraReducers: builder => {
//       builder.addCase(fetchAddTodo.fulfilled, (state, action) => {
//          dispatch(fetchTodoData);
//       });
//    },
// });
//
// export const { editTodo, fetchAddPhoto, fetchEditTodo, fetchAddTodo, fetchTodoData, fetchDeleteTodo } =
//    postsSlice.actions;
// export const { selectPosts } = postsSlice.selectors;
//
// export default postsSlice.reducer;
