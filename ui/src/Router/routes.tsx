import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Login, Signup, NotFound } from "../components/page";
import { getAuth } from "../services/identity";

interface RoutesInterface {
  path: string;
  element: React.ReactNode;
  isProtected: boolean;
}

const routes: RoutesInterface[] = [
  { path: "/", element: <Home />, isProtected: true },
  { path: "/home", element: <Home />, isProtected: true },
  { path: "/login", element: <Login />, isProtected: false },
  { path: "/signup", element: <Signup />, isProtected: false },
  { path: "*", element: <NotFound />, isProtected: false }, // Wildcard route
];

const checkProtected = (): boolean => {
  const isToken = getAuth();
  return !!isToken;
};

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  return checkProtected() ? <>{element}</> : <Navigate to="/login" replace />;
};

const RoutesComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, isProtected }, index) => (
          <Route
            key={index}
            path={path}
            element={
              isProtected ? <ProtectedRoute element={element} /> : element
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
