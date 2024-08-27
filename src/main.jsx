import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store/index';
import { Provider } from 'react-redux';
import BrowserRouter from './components/browser-router';
import history from './common/history';
import Auth from './Auth';

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);
root.render(
   <BrowserRouter history={history}>
      <Provider store={store}>
         <Auth>
            <App />
         </Auth>
      </Provider>
   </BrowserRouter>,
);
