import { useState, useEffect } from 'react';
import AgregarPreguntas from './AgregarPreguntas'; // Importa el componente AgregarPreguntas
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/CrearExamenStyle.css';

const CrearExamen = ({ teacherId, cursoId }) => {
    const [mostrarFormulario, setMostrarFormulario] = useState(true); // Estado para controlar la visibilidad del formulario
    const [examName, setExamName] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [totalQuestions, setTotalQuestions] = useState('');
    const [availabilityDate, setAvailabilityDate] = useState('');
    const [availabilityTime, setAvailabilityTime] = useState('');
    const [theme, setTheme] = useState('');
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        // Fetch themes from the backend
        const fetchData = async () => {
            try {
                const themesResponse = await fetch('http://localhost:3001/api/temas');
                const themesData = await themesResponse.json();
                setThemes(themesData);
            } catch (error) {
                console.error('Error al obtener temas:', error);
            }
        };

        fetchData();
    }, []);

    const handleExamCreation = async (event) => {
        event.preventDefault();
        setMostrarFormulario(false); // Ocultar el formulario al presionar el botón de crear examen
    };

    return (
        <div className="container">
            {mostrarFormulario ? (
                <div className="form-container">
                    <h2>Crear examen</h2>
                    <form onSubmit={handleExamCreation}>
                        <div className="form-row">
                            <div className="form-group-CE left-column">
                                <label>Nombre del examen:</label>
                                <input
                                    type="text"
                                    value={examName}
                                    onChange={(e) => setExamName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group-CE right-column">
                                <label>Descripción:</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group-CE left-column">
                                <label>Tiempo (en minutos):</label>
                                <input
                                    type="number"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                    min="0"
                                />
                            </div>
                            <div className="form-group-CE right-column">
                                <label>Total de preguntas:</label>
                                <input
                                    type="number"
                                    value={totalQuestions}
                                    onChange={(e) => setTotalQuestions(e.target.value)}
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group-CE left-column">
                                <label>Fecha de disponibilidad:</label>
                                <input
                                    type="date"
                                    value={availabilityDate}
                                    onChange={(e) => setAvailabilityDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group-CE right-column">
                                <label>Hora de disponibilidad:</label>
                                <input
                                    type="time"
                                    value={availabilityTime}
                                    onChange={(e) => setAvailabilityTime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group-CE right-column">
                                <label>Tema:</label>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Selecciona un tema</option>
                                    {themes.map((theme) => (
                                        <option key={theme.id} value={theme.id}>
                                            {theme.titulo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group-CE">
                            <button type="submit" className="submit-button">Crear</button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="back-arrow-Agg" onClick={() => setMostrarFormulario(true)}>
                        <FiArrowLeft />
                    </div>
                    <AgregarPreguntas teacherId={teacherId} cursoId={cursoId} />
                </>
            )}
        </div>
    );
};

export default CrearExamen;
