import "./App.css";
import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter as Router, 
  Route, 
  Routes 
} from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { Login, Register, Todo } from "./Pages/index";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const PrivateRoutes = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return isLoggedIn ? <Outlet /> : <Navigate to="/"  />;
};

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
        <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/todo" element={<Todo />} />
          </Route>
    </Route>
      
  )
)
function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </>
  );
}

export default App;
