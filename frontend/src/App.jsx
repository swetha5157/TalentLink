import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {HomeLayout,Landing,Register,Login,
  DashboardLayout,Error,AddJob,Stats,AllJobs,Profile,Admin} from './pages'
import { action as registerAction} from './pages/Register';
import {action as loginAction} from './pages/Login.jsx'
import {loader as dashboardLoader} from './pages/DashboardLayout.jsx'
import { action as addJobAction } from "./pages/AddJob.jsx";
import { loader as allJobsLoader } from "./pages/AllJobs.jsx";


export const checkDefaultTheme=()=>{
  const isDarkTheme=localStorage.getItem('darkTheme')==='true';
  document.body.classList.toggle('dark-theme',isDarkTheme);
  return isDarkTheme;
};
checkDefaultTheme();

const myroutes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "error",
        element: <Error />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader:dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action:addJobAction
          },
          {
            path: "alljobs",
            element: <AllJobs />,
            loader:allJobsLoader
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
      {
        path: "landing",
        element: <Landing />,
      },
    ],
  },
  //  here the path '/' is parent and the links in children[] are relative to the parent..so for
  //  the path in the children no need forward slash
]);
function App() {
  return (
    <>
  <RouterProvider router={myroutes}>

  </RouterProvider>
    </>
  )
}

export default App
