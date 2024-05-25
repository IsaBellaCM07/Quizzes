import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import DashboardEstudiante from "./components/DashboardEstudiante.jsx";
import DashboardDocente from "./components/DashboardDocente.jsx";
import InicioEstudiante from './components/InicioEstudiante.jsx';
import LoginEstudiante from './components/LoginEstudiante';
import LoginDocente from './components/LoginDocente.jsx';
import DetalleExamen from './components/DetalleExamen.jsx';
import InfoPreExamen from './components/InfoPreExamen.jsx';
import PresentarExamen from './components/PresentarExamen.jsx';
import CrearExamen from './components/CrearExamen.jsx';
import InicioDocente from './components/InicioDocente.jsx';


function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/dashboardEstudiante/:studentId" element={<DashboardEstudiante />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/loginEstudiante" element={<LoginEstudiante />} />
                    <Route path="/loginDocente" element={<LoginDocente />} />
                    <Route path="/dashboardEstudiante/:studentId" element={<DashboardEstudiante />} />
                    <Route path="/inicioEstudiante/:studentId" element={<InicioEstudiante />} />
                    <Route path="/informacionExamen/:studentId" element={<DetalleExamen />} />
                    <Route path="/infoPreExamen/:studentId/:examenId" element={<InfoPreExamen />} />
                    <Route path="/presentarExamen/:studentId/:examenId" element={<PresentarExamen />} />
                    <Route path="/dashboardDocente/:teacherId" element={<DashboardDocente />} />
                    <Route path="/inicioDocente/:teacherId/:cursoId" element={<InicioDocente />} />
                    <Route path="/crearExamen/:teacherId/:cursoId" element={<CrearExamen />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
