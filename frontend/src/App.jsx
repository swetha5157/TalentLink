import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {HomeLayout,Landing,Register,Login,DashboardLayout,Error} from './pages'
const myroutes=createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/error',
    element:<Error/>
  },{
    path:'/dashboard',
    element:<DashboardLayout/>
  },
  {
    path:'/landing',
    element:<Landing/>
  }
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
