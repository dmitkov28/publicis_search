import { Route, Routes } from 'react-router-dom';
import KeywordSearch from './pages/KeywordSearch';
import SearchTrendsPage from './pages/SearchTrends';
import About from './pages/About';
import Navigation from './components/common/nav/Navigation';
import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/RequireAuth';
import SavedKeywords from './pages/SavedKeywords/SavedKeywords';

function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Navigation />}>
            <Route path='/explore-suggestions' element={<KeywordSearch />} />
            <Route path='/saved-keywords' element={<SavedKeywords />} />
            <Route path='/saved-keywords/:keyword/:platform' element={<SavedKeywords />} />
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
