
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from  './context/AuthContext'

import Header from './components/Header'
import Homepage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotePage from "./pages/NotePage"

function App() {
  return (
      <div className="App">
        <Router>
          <AuthProvider>
            <Header />
            <div className='container dark'>
              <div className='app'>

              <PrivateRoute Component={Homepage} path='/' exact />
                <Routes> 
                  <Route Component={LoginPage} path='/login' exact />
                  <Route path ='/notes-detail/:id' element={<NotePage />} />
                </Routes>
              </div>
              </div>
          </AuthProvider>
        </Router>
      </div>
    
  );
}

export default App;
