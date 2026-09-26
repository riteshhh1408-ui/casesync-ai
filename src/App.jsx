import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import CreateCase from "./pages/CreateCase";
import EvidenceUpload from "./pages/EvidenceUpload";
import EvidenceReview from "./pages/EvidenceReview";
import Timeline from "./pages/Timeline";
import Verification from "./pages/Verification";
import Report from "./pages/Report";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cases/new" element={<CreateCase />} />
        <Route path="/cases/:caseId/upload" element={<EvidenceUpload />} />
        <Route path="/cases/:caseId/review" element={<EvidenceReview />} />
        <Route path="/cases/:caseId/timeline" element={<Timeline />} />
        <Route path="/cases/:caseId/verification" element={<Verification />} />
        <Route path="/cases/:caseId/report" element={<Report />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}