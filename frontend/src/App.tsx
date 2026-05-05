import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ViewDetailPage from "./pages/ViewDetailPage";
import SubmitPage from "./pages/SubmitPage";
import SearchPage from "./pages/SearchPage";
import WelcomePage from "./pages/WelcomePage";
import InstructionPage from "./pages/InstructionPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritePage from "./pages/FavoritePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            {/* public routes */}
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/instruction" element={<InstructionPage />} />
            <Route path="/guide" element={<InstructionPage />} />

            {/* main routes (protected) */}
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><FavoritePage /></ProtectedRoute>} />
            <Route path="/view-detail/:id" element={<ProtectedRoute><ViewDetailPage /></ProtectedRoute>} />
            <Route path="/submit" element={<ProtectedRoute><SubmitPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/change-password" element={<ProtectedRoute><ChangePasswordPage /></ProtectedRoute>} />
            
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
