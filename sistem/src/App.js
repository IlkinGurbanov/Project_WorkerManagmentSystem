import Table from './components/Panel'
import Register from './Account/register/register'
import Signin from './Account/Signin/signin'
import { Outlet } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css'; // CSS dosyasını içe aktarın
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <div className="App">
      <Outlet/>
      <ToastContainer />
    </div>
  );
}

export default App;
