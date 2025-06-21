import { Routes, Route } from 'react-router-dom';
import AppOutet from './assets/Layouts/AppOutet';
import Home from './assets/Layouts/Home';
import AuthProvider from './context/AuthProvider';


function App() {

  return (
    <AuthProvider>
      <div id='App' className='w-full flex flex-col h-dvh'>
        <Routes>
          <Route path='/' element={<AppOutet />}>
            <Route index={true} element={<Home />} />
          </Route>
        </Routes>

      </div>
    </AuthProvider>
  )
}

export default App
