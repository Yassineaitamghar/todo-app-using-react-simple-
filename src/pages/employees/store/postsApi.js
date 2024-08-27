import { serialize } from 'object-to-formdata';
import emptySplitApi from '../../../store/empty-slice-api';
import providesList from '../../../store/provides-list';

const tagType = 'Employees';
const postsApi = emptySplitApi.enhanceEndpoints({ addTagTypes: [tagType] }).injectEndpoints({
   endpoints: build => ({
      getEmployees: build.query({
         query: params => ({
            url: '/employees',
            method: 'GET',
            params,
         }),
         providesTags: (result, error) => (!error ? providesList(result.data, tagType) : []),
      }),
      getEmployeeById: build.query({
         query: id => ({
            url: `/employees/${id}`,
            method: 'GET',
         }),
         providesTags: (result, error) => (!error ? [tagType] : []),
      }),
      addEmployee: build.mutation({
         query: data => ({
            url: '/employees/add',
            method: 'POST',
            data,
         }),
         invalidatesTags: (_result, error) => (!error ? [{ type: tagType, id: 'LIST' }] : []),
      }),
      updateEmployee: build.mutation({
         query: ({ id, updatedTodo }) => ({
            url: `/employees/${id}/edit`,
            method: 'PUT',
            data: updatedTodo,
         }),
         invalidatesTags: (_result, error, arg) => (!error ? [{ type: tagType, id: arg.id }] : []),
      }),
      deleteEmployee: build.mutation({
         query: id => ({
            url: `/employees/${id}/delete`,
            method: 'DELETE',
         }),
         invalidatesTags: (_result, error, arg) => (!error ? [{ type: tagType, id: arg }] : []),
      }),
      addPhotoEmployee: build.mutation({
         query: ({ id, picture }) => ({
            url: `/employees/${id}/picture`,
            method: 'PATCH',
            data: serialize({ picture }),
         }),
         invalidatesTags: (_result, error) => (!error ? [tagType] : []),
      }),
   }),
   overrideExisting: false,
});

export const {
   useGetEmployeesQuery,
   useGetEmployeeByIdQuery,
   useAddEmployeeMutation,
   useUpdateEmployeeMutation,
   useDeleteEmployeeMutation,
   useAddPhotoEmployeeMutation,
} = postsApi;
export default postsApi;
