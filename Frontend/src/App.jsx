import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ApprovalConfirmGuide } from "./pages/ApprovalConfirmGuide";
import GuidList from "./pages/GuidList";
import UserDetails from "./pages/UserDetails";
import AuthProtectedRoute from "./protectedRoutes/AuthProtectedRoute";
import Layout from "./Layout/Layout";
// import TopDestinations from "./pages/TopDestinations";
import Guides from "./pages/Guides";
import { Home } from "./pages/Home";

import BookGuideForm from "./pages/BookGuideForm";
import GuideProfile from "./pages/GuideProfile";
import { SingleDestinationDetails } from "./pages/SingleDestinationDetails";
// import BecomeAGuidRequest from "./components/BecomeAGuidRequest";
import { SendBecomeGuideRequest } from "./pages/SendBecomeGuideRequest";
import UploadUserDocuments from "./components/UploadUserDocuments";
import Dashboard from "./pages/admin/Dashboard";
import { GuideVerificationRequestReview } from "./pages/admin/GuideVerificationRequestsReview";
import VerifiedGuides from "./pages/admin/VerifiedGuides";
// import { UsersComponent } from "./pages/admin/NormalUserComponents";
import Admins from "./pages/admin/Admins";
import AdminLayout from "./pages/admin/AdminLayout";
import { DashBoardPanel } from "./pages/admin/DashBoardPanel";
import DestinationCard from "./components/DestinationCard";
import { PrivacyAndPolicies } from "./pages/PrivacyAndPolicy";
import MessageLayout from "./pages/MessageLayout";
import ViewDocuments from "./pages/admin/ViewDocuments";
// import ViewDocuments from "./pages/admin/ViewDocuments";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/find-a-guide" element={<Guides />} />
          <Route
            path="/get-single-destination-details/:id"
            element={<SingleDestinationDetails />}
          />
          <Route path="/guide-profile/:guideId" element={<GuideProfile />} />
          <Route path="/guide-list" element={<GuidList />} />
          <Route path="/top-destinations" element={<DestinationCard />} />
          <Route path="/book-guide/:guideId" element={<BookGuideForm />} />
          <Route
            path="/book-guide/update-docs"
            element={<UploadUserDocuments />}
          />
          <Route
            path="/become-guide/:guideId"
            element={<SendBecomeGuideRequest />}
          />

          {/* protected routes  */}
          <Route path="/protected" element={<AuthProtectedRoute />}>
            <Route
              path="approval-for-guide"
              element={<ApprovalConfirmGuide />}
            />
            <Route
              path="admin"
              element={<DashBoardPanel />}
            />
          </Route>
          {/* dashboard panal */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route element={<ProtectedRoute />}> */}

          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route
            path="/guide-verification-request"
            element={<GuideVerificationRequestReview />}
          />

          {/* </Route> */}

          <Route path="/verified-guides" element={<VerifiedGuides />} />

          <Route path="/privacy-policy" element={<PrivacyAndPolicies />} />
          <Route path="/message-chat" element={<MessageLayout />} />

          <Route path="/view-documents" element={<ViewDocuments />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
