import "./App.css";
import Home from "./clientPage/pages/home/Home";
import Login from "./clientPage/pages/login/Login";
import Navbar from "./clientPage/components/navbar/Navbar";
import Profile from "./clientPage/pages/profile/Profile";

import HD from "./clientPage/components/hd/HD";
import HomePage from "./clientPage/pages/homepage/Home";
import Footer from "./clientPage/components/footer/Footer";
import Registers from "./clientPage/pages/register/Registers";
import TOR from "./clientPage/components/tor/TOR";
//adminPages
import AdminLogin from "./adminPage/components/login/Login";
import AdminDashboard from "./adminPage/dashboard/Dashboard";
import AdminHome from "./adminPage/home/Curse";
import AdminRequest from "./adminPage/requests/Requests";
import RequestHD from "./adminPage/requestHD/RequestHD";
import AdminRequestWDF from "./adminPage/requestWDF/RequestWDF";
//signatoriesPages
import SignatoriesDashboard from "./signatoriesPage/pages/dashboard/Dashboard";
import SignatoriesRequestCFRD from "./signatoriesPage/components/requestTOR/RequestTOR";
import SignatoriesRequestHD from "./signatoriesPage/components/requestHD/RequestHD";
import SignatoriesRequestWDF from "./signatoriesPage/components/requestWDF/RequestWDF";
//superadminPages
import SuperAdminDashboard from "./superAdminPage/pages/Dashboard/Dashboard";
import SuperAdminLoginPage from "./superAdminPage/pages/Login/Login";
import SuperAdminRequestCFRD from "./superAdminPage/pages/Requests/Requests";
import SuperAdminRequestHD from "./superAdminPage/pages/requestHD/RequestHD";
import SuperAdminHomePage from "./superAdminPage/pages/HomePage/HomePage";
import SuperAdminUserProfile from "./superAdminPage/pages/UserProfile/Profile";
import {
  // Routes,
  // Route,
  // Link,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

const HomePageLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registers />,
  },
  {
    element: <HomePageLayout />,
    children: [
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      { path: "/homepage", element: <HomePage /> },
      { path: "/request/cfrd", element: <TOR /> },
      { path: "/request/hd", element: <HD /> },
    ],
  },

  {
    path: "/admin/home",
    element: <AdminHome />,
  },
  {
    path: "/admin/requests",
    element: <AdminRequest />,
  },
  {
    path: "/admin/dashboard/allrequest",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/request/wdf",
    element: <AdminRequestWDF />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/request/hd",
    element: <RequestHD />,
  },
  {
    path: "/signatories/dashboards",
    element: <SignatoriesDashboard />,
  },
  {
    path: "/signatories/requests/cfrd",
    element: <SignatoriesRequestCFRD />,
  },
  {
    path: "/signatories/request/hd",
    element: <SignatoriesRequestHD />,
  },
  {
    path: "/signatories/request/wdf",
    element: <SignatoriesRequestWDF />,
  },
  {
    path: "/superadmin/dashboard",
    element: <SuperAdminDashboard />,
  },
  {
    path: "/superadmin/login",
    element: <SuperAdminLoginPage />,
  },
  {
    path: "/superadmin/requests/cfrd",
    element: <SuperAdminRequestCFRD />,
  },
  {
    path: "/superadmin/requests/hd",
    element: <SuperAdminRequestHD />,
  },
  {
    path: "/superadmin/home",
    element: <SuperAdminHomePage />,
  },
  {
    path: "/superadmin/profile",
    element: <SuperAdminUserProfile />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
