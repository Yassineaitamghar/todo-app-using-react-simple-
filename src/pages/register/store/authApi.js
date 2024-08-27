import emptySplitApi from '../../../store/empty-slice-api';
import { getUserInfo } from '../../../store/user';

const authApi = emptySplitApi.injectEndpoints({
   endpoints: build => ({
      signUp: build.mutation({
         query: ({ username, password, name, passwordConfirmation }) => ({
            url: '/auth/sign-up',
            method: 'POST',
            data: { username, password, name, passwordConfirmation },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               // success
               dispatch(getUserInfo(data.accessToken));
            } catch {
               console.log('error');
            }
         },
      }),
   }),
});

export const { useSignUpMutation } = authApi;
