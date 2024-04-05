import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectsProvider } from './context/ProjectsContext';
import { ReportProvider } from './context/ReportContext';
import { ProtectedRoute } from './ProtectedRoute';
import { TasksProvider } from './context/TasksContext';
import { CreateReport } from './components/CreateReport';
// import { DetailsProject } from './components/DetailsProject';
// import { DetailsTasks } from './components/DetailsTasks';
// import { DetailsReport } from './components/DetailsReport';
// import { ConfigUser } from './components/ConfigUser';
const DashboardPage = lazy(async () => await import('./pages/DashboardPage'));
const HomePage = lazy(async () => await import('./pages/HomePage'));
const RegisterPage = lazy(async () => await import('./pages/RegisterPage'));
const LoginPage = lazy(async () => await import('./pages/LoginPage'));
const PlatformPage = lazy(async () => await import('./pages/PlatformPage'));
const ProjectsPage = lazy(async () => await import('./pages/ProjectsPage'));
const TasksPage = lazy(async () => await import('./pages/TasksPage'));
const NotFound = lazy(async () => await import('./pages/NotFound'));
const DetailsProject = lazy(
  async () => await import('./components/DetailsProject'),
);
const DetailsTasks = lazy(
  async () => await import('./components/DetailsTasks'),
);
const DetailsReport = lazy(
  async () => await import('./components/DetailsReport'),
);
const ConfigUser = lazy(async () => await import('./components/ConfigUser'));

function App(): JSX.Element {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <TasksProvider>
          <ReportProvider>
            <Suspense fallback="Loading...">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="*" element={<NotFound />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/platform" element={<PlatformPage />} />
                    <Route path="/platform/tasks" element={<TasksPage />} />
                    <Route
                      path="/platform/projects"
                      element={<ProjectsPage />}
                    />
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
            </Suspense>
          </ReportProvider>
        </TasksProvider>
      </ProjectsProvider>
    </AuthProvider>
  );
}

export default App;
