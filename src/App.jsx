import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import LoginEstudiante from './components/LoginEstudiante';
import LoginDocente from './components/LoginDocente.jsx';
import InicioDocente from './components/InicioDocente.jsx';
import Header from './components/Header.jsx';


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

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
