import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginAuth } from './pages/LoginAuth';
import { RegisterAuth } from './pages/RegisterAuth';
import { NotFound } from './pages/NotFound';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginAuth />} />
        <Route path="/register" element={<RegisterAuth />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
