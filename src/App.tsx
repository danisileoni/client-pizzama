import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginAuth } from './pages/LoginAuth';
import { RegisterAuth } from './pages/RegisterAuth';
import { NotFound } from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginAuth />} />
          <Route path="/register" element={<RegisterAuth />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
