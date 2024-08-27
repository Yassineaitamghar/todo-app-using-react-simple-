// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axios-base-query';

// initialize an empty api service that we'll inject endpoints into later as needed
const emptySplitApi = createApi({
   baseQuery: axiosBaseQuery(),
   endpoints: () => ({}),
   keepUnusedDataFor: 0,
   refetchOnFocus: false,
   refetchOnMountOrArgChange: false,
   refetchOnReconnect: false,
   reducerPath: 'TODO',
});

export default emptySplitApi;
