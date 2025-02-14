import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Feature1 from "./pages/Feature1";
import Feature2 from "./pages/Feature2";
import PodcastCreatorPage from "./pages/PodcastCreatorPage";
import { AuthProvider } from "./lib/context/AuthContext";
import PrivateRoutes from "./pages/utils/PrivateRoutes";
import { PodcastProvider } from "./lib/context/PodcastContext";
import CreatePodcast from "./pages/CreatePodcast";

function App() {
  const savedSession = localStorage.getItem("userSession");
  return (
    <>
      <Router>
        <AuthProvider>
          <PodcastProvider>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/signin"
                element={
                  savedSession ? <Navigate to="/dashboard" /> : <SignIn />
                }
              />
              <Route
                path="/signup"
                element={
                  savedSession ? <Navigate to="/dashboard" /> : <SignUp />
                }
              />
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="feature1" element={<Feature1 />} />
                  <Route path="feature2" element={<Feature2 />} />
                  <Route
                    path="createPodcast"
                    element={<PodcastCreatorPage />}
                  />
                  <Route path="create" element={<CreatePodcast />} />
                </Route>
              </Route>
            </Routes>
          </PodcastProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
