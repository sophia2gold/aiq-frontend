import { Routes, Route } from 'react-router-dom';
import OnboardingPage from './views/OnboardingPage';
// import Dashboard from './views/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home/Dashboard Route */}
      {/* <Route path='/' element={<Dashboard />} /> */}

      {/* Onboarding Route */}
      <Route path='/onboarding' element={<OnboardingPage />} />

      {/* Catch-all 404 Route */}
      <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
