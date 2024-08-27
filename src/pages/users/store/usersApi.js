import emptySplitApi from '../../../store/empty-slice-api';
import providesList from '../../../store/provides-list';

const tagType = 'Users';
const usersApi = emptySplitApi.enhanceEndpoints({ addTagTypes: [tagType] }).injectEndpoints({
   endpoints: build => ({
      getUsers: build.query({
         query: params => ({
            url: '/user/all',
            method: 'GET',
            params,
         }),
         providesTags: (result, error) => (!error ? providesList(result.data, tagType) : []),
      }),
      deleteUser: build.mutation({
         query: id => ({
            url: `/user/${id}/delete`,
            method: 'DELETE',
         }),
         invalidatesTags: (_result, error) => (!error ? [{ type: tagType, id: 'LIST' }] : []),
      }),
      addUser: build.mutation({
         query: data => ({
            url: '/user/add',
            method: 'POST',
            data,
         }),
         invalidatesTags: (_result, error) => (!error ? [{ type: tagType, id: 'LIST' }] : []),
      }),
   }),
   overrideExisting: false,
});

export const { useDeleteUserMutation, useAddUserMutation, useGetUsersQuery, user } = usersApi;
