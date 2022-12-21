import Sidenav from 'components/SideNav'
import Home from 'layout/Home'
import Wallet from 'layout/Wallet'
import ToastContainer from 'components/Toast/ToastContainer';
import { ToastProvider } from 'context/ToastContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
            </Routes>
          </Sidenav>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;
