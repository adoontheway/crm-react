import {  Routes, Route } from 'react-router-dom';
import { AuthRoute } from './components/authroute';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils';
import Login from './pages/login/login';
import MainLayout from './pages/layout/layout';
import Home from './pages/home/home';
import Article from './pages/article/article';
import Publish from './pages/publish/publish';
import './App.scss';


function App() {
  return (
    <HistoryRouter history={history}>
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        
        <Route 
          path='/' 
          element={
            <AuthRoute>
              <MainLayout/>
            </AuthRoute>}
        >

          <Route index element={<Home />}/>
          <Route path='article' element={<Article />} />
          <Route path='publish' element={<Publish />} />
        </Route>
      
      
      </Routes>
    </div>
    
    </HistoryRouter>
    
  );
}

export default App;
