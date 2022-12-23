import Sidenav from 'components/SideNav'
import ToastContainer from 'components/Toast/ToastContainer';
import { ToastProvider } from 'context/ToastContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from 'layout/Home'
import CheckWallet from 'layout/CheckWallet'
import AptosNames from 'layout/Tools/AptosNames'
import TokenSearch from 'layout/Tools/TokenSearch'

function App() {
  return (
    <div className='duration-normal min-h-screen bg-darkBackground'>
      <ToastProvider>
        <ToastContainer />
        <BrowserRouter>
          <Sidenav>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/address/:id' element={<CheckWallet />} />
              <Route path='/ans' element={<AptosNames />} />
              <Route path='/token-search' element={<TokenSearch />} />
            </Routes>
          </Sidenav>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;
