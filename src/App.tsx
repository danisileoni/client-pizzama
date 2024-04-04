import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { NotFound } from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { PlatformPage } from './pages/PlatformPage';
import { ProtectedRoute } from './ProtectedRoute';
import { ProjectsProvider } from './context/ProjectsContext';
import { ReportProvider } from './context/ReportContext';
import { DetailsProject } from './components/DetailsProject';
import { DetailsReport } from './components/DetailsReport';
import { TasksPage } from './pages/TasksPage';
import { TasksProvider } from './context/TasksContext';
import { DetailsTasks } from './components/DetailsTasks';
import { ProjectsPage } from './pages/ProjectsPage';
import { CreateReport } from './components/CreateReport';
import { DashboardPage } from './pages/DashboardPage';
import { ConfigUser } from './components/ConfigUser';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <TasksProvider>
          <ReportProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFound />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/platform" element={<PlatformPage />} />
                  <Route path="/platform/tasks" element={<TasksPage />} />
                  <Route path="/platform/projects" element={<ProjectsPage />} />
                  {/* routes whit id */}
                  <Route
                    path="/platform/task/:taskId"
                    element={<DetailsTasks />}
                  />
                  <Route
                    path="/platform/project/:projectId"
                    element={<DetailsProject />}
                  />
                  <Route
                    path="/platform/project/create-report/:projectId"
                    element={<CreateReport />}
                  />
                  <Route
                    path="/platform/report/:reportId"
                    element={<DetailsReport />}
                  />
                  <Route
                    path="/platform/config-user/:userId"
                    element={<ConfigUser />}
                  />
                  <Route
                    path="/platform/dashboard"
                    element={<DashboardPage />}
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </ReportProvider>
        </TasksProvider>
      </ProjectsProvider>
    </AuthProvider>
  );
}

export default App;
