import Sidenav from 'components/SideNav'
import ToastContainer from 'components/Toast/ToastContainer';
import { ToastProvider } from 'context/ToastContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from 'layout/Home'
import Wallet from 'layout/Wallet'
import AptosNames from 'layout/Tools/AptosNames'

function App() {
  return (
    <div className='duration-normal min-h-screen bg-darkBackground'>
      <ToastProvider>
        <ToastContainer />
        <BrowserRouter>
          <Sidenav>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/wallet/:id' element={<Wallet />} />
              <Route path='/ans' element={<AptosNames />} />
            </Routes>
          </Sidenav>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;
