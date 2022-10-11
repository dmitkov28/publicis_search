import { Route, Routes } from 'react-router-dom';
import KeywordSearch from './pages/KeywordSearch';
import SearchTrendsPage from './pages/SearchTrends';
import About from './pages/About';
import Navigation from './components/common/nav/Navigation';
import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/RequireAuth';

function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Navigation />}>
            <Route path='/' element={<KeywordSearch />} />
            <Route path='/search-trends' element={<SearchTrendsPage />} />
            <Route path='/use-cases' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Route>
        <Route path='login' element={<LoginPage />} />
        <Route path='reset-password' element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
