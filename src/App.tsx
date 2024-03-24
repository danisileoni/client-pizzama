import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { NotFound } from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { PlatformPage } from './pages/PlatformPage';
import { ProtectedRoute } from './ProtectedRoute';
import { ProjectsProvider } from './context/ProjectsContext';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/platform" element={<PlatformPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProjectsProvider>
    </AuthProvider>
  );
}

export default App;
