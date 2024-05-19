import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import LoginEstudiante from './components/LoginEstudiante';
import LoginDocente from './components/LoginDocente.jsx';
import InicioDocente from './components/InicioDocente.jsx';
import InicioEstudiante from './components/InicioEstudiante.jsx';
import DetalleExamen from './components/DetalleExamen.jsx';
import InfoPreExamen from './components/InfoPreExamen.jsx';
import PresentarExamen from './components/PresentarExamen.jsx';


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/loginEstudiante" element={<LoginEstudiante />} />
                    <Route path="/loginDocente" element={<LoginDocente />} />
                    <Route path="/inicioDocente" element={<InicioDocente />} />
                    <Route path="/inicioEstudiante/:studentId" element={<InicioEstudiante />} />
                    <Route path="/informacionExamen/:studentId" element={<DetalleExamen />} />
                    <Route path="/infoPreExamen/:studentId/:examenId" element={<InfoPreExamen />} />
                    <Route path="/presentarExamen/:studentId/:examenId" element={<PresentarExamen />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
