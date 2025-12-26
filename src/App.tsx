import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import "./assets/sass/styles.scss";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import About from "./pages/About";

import Analytics from "./pages/Analytics";
import EconomicIndicators from "./pages/EconomicIndicators";
import MacroEconomic from "./pages/MacroEconomic";
import DemoEconomic from "./pages/DemoEconomic";
import StateServices from "./pages/StateServices";
import Crimes from "./pages/Crimes";
import SectorEconomic from "./pages/SectorEcenomic";
import LaborMarket from "./pages/LaborMarket";

import HelpAndContact from "./pages/HelpAndContact";
import FAQ from "./pages/FAQ";
import UserManual from "./pages/UserManual";
import ContactForm from "./pages/ContactForm";

import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Report from "./pages/Report";
import AcademicReports from "./pages/AcademicReports";
import EconomicReports from "./pages/EconomicReports";
import FinancialReports from "./pages/FinancialReports";
import ScienceReports from "./pages/ScienceReports";
import AcademicPublications from "./pages/AcademicPublications";
import PublicationEconomic from "./pages/PublicationEconomic";
import PublicationFinancial from "./pages/PublicationFinancial";
import PublicationScience from "./pages/PublicationScience";

import ProfileSettings from "./pages/ProfileSettings";

import InternationalDemonstrators from "./pages/InternationalDemonstrators";

import OpenInfoAllData from "./pages/OpenInfoAllData.tsx";
import OpenInfoPages from "./pages/OpenInfoPages.tsx";


import Subscriptions from "./pages/Subscriptions";
import SubscriptionsInfo from "./pages/SubscriptionsInfo";
import PaymentInfo from "./pages/PaymentInfo";
import ReCapcha from "./pages/ReCapcha";
import ConfirmDetails from "./pages/ConfirmDetails";
import NewPassword from "./pages/NewPassword";

import Profile from "./pages/Profile";
import PersonalInfo from "./pages/PersonalInfo";
import SecuritySettings from "./pages/SecuritySettings";
import PaymentHistory from "./pages/PaymentHistory";
import ReceiptDetails from "./pages/ReceiptDetails";
import LanguageSwitch from "./pages/LanguageSwitch";
import ProfileDeactivate from "./pages/ProfileDeactivate";
import GlobalInnovationIndexRank from "./pages/GlobalInnovationIndexRank";
import AiReadinessRank from "./pages/AiReadinessRank";
import EGovernmentDevelopmentIndex from "./pages/EGovernmentDevelopmentIndex";
import ReportDetails from "./pages/ReportDetails";
import Purpose from "./pages/Purpose";
import Mission from "./pages/Mission";
import AboutLayout from "./layout/AboutLayout";
import OpenInfoHealth from "./pages/OpenInfoHealth.tsx";
import OpenInfoTourism from "./pages/OpenInfoTourism.tsx";
import OpenInfoEnergy from "./pages/OpenInfoEnergy.tsx";
import OpenInfoDemographicIndicators from "./pages/OpenInfoDemographicIndicators.tsx";
import OpenInfoAgriculture from "./pages/OpenInfoAgriculture.tsx";
import OpenInfoEconomicMap from "./pages/OpenInfoEconomicMap.tsx";
import OpenInfoStaticCalendar from "./pages/OpenInfoStaticCalendar.tsx";
import OpenInfoDataPolicy from "./pages/OpenInfoDataPolicy.tsx";
import OpenInfoDataRequest from "./pages/OpenInfoDataRequest.tsx";
import { useUser } from "./context/UserContext.tsx";
import { useEffect } from "react";
import { getTokenRefresh } from "./utils/token.ts";
import axios from "axios";
import OpenDataBaseLayout from "./layout/OpenDataBaseLayout.tsx";
import Add from "./pages/OpenDataBase/Add.tsx";
import DataSets from "./pages/OpenDataBase/DataSets.tsx";
import DataSet from "./pages/OpenDataBase/DataSet.tsx";
import OpenDataBase from "./pages/OpenDataBase/OpenDataBase.tsx";
import SelectCategory from "./pages/OpenDataBase/SelectCategory.tsx";
import Login1 from "./auth/Login1.tsx";
import ForgotPasswordAdmin from "./auth/ForgotPasswordAdmin.tsx";
import OptCode from "./auth/OptCode.tsx";
import NewPasswordAdmin from "./auth/NewPasswordAdmin.tsx";
import BackgroundVideo from "./components/bg-video/BackgroundVideo.tsx";
import SideBar from "./pages/admin/SideBar.tsx";
import AdminLogin_header from "./layout/AdminLogin_header.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import AdminPage from "./pages/admin/AdminPage.tsx";

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "";

  const navbarRoutes = ["/", "/about", "/analytics", "/contact", "/report"];
  const showNavbar = navbarRoutes.includes(location.pathname);

  return (
    <div className="page">
      <div>
        <Header />
      </div>

      <main>
        {showNavbar && <Navbar />}
        <Outlet />
      </main>

      {isHomePage && (
        <div className="ml-4 mr-4 pb-4">
          <Footer />
        </div>
      )}
    </div>
  );
};

const AdminLayout = () => {
  return (
    <div className="admin-page min-h-screen">
      <div className="video-background">
        <BackgroundVideo videoSrc="/about/bg-about.mp4" />
      </div>
      <SideBar />
      <main className=" ml-[17vw] text-white py-[30px] px-[20px] ">
        <Outlet />
      </main>
    </div>
  );
};

const AdminLogin = () => {
  return (
    <div>
      <AdminLogin_header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  const { setUser } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const refreshToken = getTokenRefresh();
        if (!refreshToken) {
          console.error("No refresh token available");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Routes>
      {/* Auth routes without layout */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/recapcha" element={<ReCapcha />} />
      <Route path="/confirm-details" element={<ConfirmDetails />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />

      {/* Main layout with nested routes */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/about" element={<AboutLayout />}>
          <Route path="purpose" element={<Purpose />}></Route>
          <Route path="mission" element={<Mission />}></Route>
        </Route>

        <Route path="/open-database" element={<OpenDataBase />} />
        <Route path="/open-database/select-category" element={<SelectCategory />} />
        <Route path="/open-database/:category" element={<OpenDataBaseLayout />}>
          <Route index element={<DataSets />} />
          <Route path="add" element={<Add />}></Route>
          <Route path=":id" element={<DataSet />}></Route>
        </Route>

        <Route path="/analytics" element={<Analytics />}>
          <Route path="economic_indicators" element={<EconomicIndicators />}>
            <Route path="macro" element={<MacroEconomic />} />
            <Route path="sector" element={<SectorEconomic />} />
            <Route path="demo" element={<DemoEconomic />} />
            <Route path="state_services" element={<StateServices />} />
            <Route path="crimes" element={<Crimes />} />
            <Route path="labor_market" element={<LaborMarket />} />
          </Route>
          <Route
            path="international_demonstrators"
            element={<InternationalDemonstrators />}
          >
            <Route
              path="global_innovation"
              element={<GlobalInnovationIndexRank />}
            />
            <Route path="ai_readness" element={<AiReadinessRank />} />
            <Route path="e_gov" element={<EGovernmentDevelopmentIndex />} />
          </Route>

          <Route
            path="international_demonstrators"
            element={<InternationalDemonstrators />}
          />
          <Route path="open_info" element={<OpenInfoPages />}>
            <Route path="all_data" element={<OpenInfoAllData />} />
            <Route path="health" element={<OpenInfoHealth />} />
            <Route path="tourism" element={<OpenInfoTourism />} />
            <Route path="energy" element={<OpenInfoEnergy />} />
            <Route
              path="demographic_indicators"
              element={<OpenInfoDemographicIndicators />}
            />
            <Route path="agriculture" element={<OpenInfoAgriculture />} />
            <Route path="economic_map" element={<OpenInfoEconomicMap />} />
            <Route
              path="statistical_calendar"
              element={<OpenInfoStaticCalendar />}
            />
            <Route path="open_data_policy" element={<OpenInfoDataPolicy />} />
            <Route path="data_request" element={<OpenInfoDataRequest />} />
          </Route>
        </Route>
        <Route path="open_infobase" element={<OpenDataBase />} />

        <Route path="/report" element={<Report />} />
        <Route path="/report/:type/:id" element={<ReportDetails />} />
        <Route path="/contact" element={<HelpAndContact />}>
          <Route path="faq" element={<FAQ />} />
          <Route path="user_manual" element={<UserManual />} />
          <Route path="contact_form" element={<ContactForm />} />
        </Route>
        <Route path="/academic_reports" element={<AcademicReports />} />
        <Route
          path="/academic_reports/economic_reports"
          element={<EconomicReports />}
        />
        <Route
          path="/academic_reports/financial_reports"
          element={<FinancialReports />}
        />
        <Route
          path="/academic_reports/science_reports"
          element={<ScienceReports />}
        />
        <Route
          path="/academic_publications/economic_publication"
          element={<PublicationEconomic />}
        />
        <Route
          path="/academic_publications/financial_publication"
          element={<PublicationFinancial />}
        />
        <Route
          path="/academic_publications/science_publication"
          element={<PublicationScience />}
        />
        <Route
          path="/academic_publications"
          element={<AcademicPublications />}
        />

        <Route path="/profile" element={<Profile />}>
          <Route index element={<PersonalInfo />} />
          <Route path="personal_info" element={<PersonalInfo />} />
          <Route path="settings" element={<ProfileSettings />}>
            <Route index element={<LanguageSwitch />} />
            <Route path="language" element={<LanguageSwitch />} />
            <Route path="subscriptions" element={<Subscriptions />} />

            <Route
              path="subscriptions/:planId"
              element={<SubscriptionsInfo />}
            />
            <Route
              path="subscriptions/:planId/payment"
              element={<PaymentInfo />}
            />
            <Route path="deactivate" element={<ProfileDeactivate />} />
          </Route>
          <Route path="security" element={<SecuritySettings />} />
          <Route path="payment-history" element={<PaymentHistory />}>
            <Route path="receipt" element={<ReceiptDetails />} />
          </Route>
        </Route>

      </Route>

      {/* Admin layout */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/statistics" element={<Dashboard />} />
        <Route path="/admin/chatbots" element={<Dashboard />} />
        <Route path="/admin/reports" element={<Dashboard />} />
        <Route path="/admin/datasets" element={<Dashboard />} />
        <Route path="/admin/plans" element={<Dashboard />} />
      </Route>

      <Route element={<AdminLogin />}>
        <Route path="/login1" element={<Login1 />} />
        <Route path="/login1/forgot-password" element={<ForgotPasswordAdmin />} />
        <Route path="/login1/forgot-password/otp-code" element={<OptCode />} />
        <Route path="/login1/forgot-password/new-password" element={<NewPasswordAdmin />} />
      </Route>



      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
