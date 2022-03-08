import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import About from "./pages/about/About";
import Index from "./pages/index/Index";

const routes = [
  {
    path: '/',
    element: <Index />,
    children: [
      {path: '/home', element: <Home />},
      {path: '/profile/:id', element: <Profile />},
      {path: '/about', element: <About />},
    ]
  },
]

export default routes