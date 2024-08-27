import emptySplitApi from '../empty-slice-api';
import { serialize } from 'object-to-formdata';

const tagType = 'User';
const userApi = emptySplitApi.enhanceEndpoints({ addTagTypes: [tagType] }).injectEndpoints({
   endpoints: build => ({
      getUserInfo: build.query({
         query: params => ({
            url: '/user',
            method: 'GET',
            params,
         }),
         // async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
         //     try {
         //         await queryFulfilled;
         //         // when success
         //         dispatch(setLogged());
         //     } catch {
         //         //
         //     }
         // },
         providesTags: (_result, error) => (!error ? [tagType] : []),
      }),
      updateUser: build.mutation({
         query: data => ({
            url: '/user/update',
            method: 'PUT',
            data,
         }),
         invalidatesTags: (_result, error) => (!error ? [tagType] : []),
      }),
      updateUserPhoto: build.mutation({
         query: data => ({
            url: '/user/picture',
            method: 'PATCH',
            data: serialize(data),
         }),
         invalidatesTags: (_result, error) => (!error ? [tagType] : []),
      }),
      updateCoverPhoto: build.mutation({
         query: data => ({
            url: '/user/cover',
            method: 'PATCH',
            data: serialize(data),
         }),
         invalidatesTags: (_result, error) => (!error ? [tagType] : []),
      }),
   }),
});

export const { useUpdateUserPhotoMutation, useUpdateUserMutation, useUpdateCoverPhotoMutation, useGetUserInfoQuery } =
   userApi;
export default userApi;
