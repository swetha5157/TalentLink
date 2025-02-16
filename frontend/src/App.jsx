import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {HomeLayout,Landing,Register,Login,DashboardLayout,Error} from './pages'
const myroutes=createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Landing/>
      },
       {
    path:'register',
    element:<Register/>
  },
  {
    path:'login',
    element:<Login/>
  },
  {
    path:'error',
    element:<Error/>
  },{
    path:'dashboard',
    element:<DashboardLayout/>
  },
  {
    path:'landing',
    element:<Landing/>
  }
    ],
  }
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
