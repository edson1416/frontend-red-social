import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PaginaInicio from "./components/inicio/PaginaInicio.jsx";
import PageHome from "./components/home/PageHome.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";

function App() {

  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<PaginaInicio />} />
                  {/*Rutas protegidas*/}
                  <Route element={<PrivateRoute/>}>
                      <Route path="/home" element={<PageHome />} />
                  </Route>
              </Routes>
          </Router>
      </AuthProvider>
  )
}

export default App
