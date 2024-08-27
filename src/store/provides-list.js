function providesList(resultsWithIds, tagType) {
   return resultsWithIds
      ? [{ type: tagType, id: 'LIST' }, ...resultsWithIds.map(({ id }) => ({ type: tagType, id }))]
      : [{ type: tagType, id: 'LIST' }];
}

export default providesList;
