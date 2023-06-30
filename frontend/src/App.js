
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from  './context/AuthContext'

import Header from './components/Header'
import Homepage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
            <PrivateRoute Component={Homepage} path='/' exact />
              <Routes> 
                <Route Component={LoginPage} path='/login' exact />
              </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
