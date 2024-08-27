import { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

const BrowserRouter = ({ history, children, ...rest }) => {
   const [state, setState] = useState({
      action: history.action,
      location: history.location,
   });

   useLayoutEffect(() => history.listen(setState), [history]);

   return (
      <Router {...rest} location={state.location} navigationType={state.action} navigator={history}>
         {children}
      </Router>
   );
};

export default BrowserRouter;
