import { useState, useEffect } from 'react';
import AgregarPreguntas from './AgregarPreguntas'; // Importa el componente AgregarPreguntas
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/CrearExamenStyle.css';

const CrearExamen = ({ teacherId, cursoId }) => {
    const [mostrarFormulario, setMostrarFormulario] = useState(true); // Estado para controlar la visibilidad del formulario
    const [examName, setExamName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [time, setTime] = useState('');
    const [totalQuestions, setTotalQuestions] = useState('');
    const [aleatoryQ, setAleatoryQ] = useState('');
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

        const dateValue = availabilityDate;

        const timeValueD = availabilityTime;

        const timeValueF = time;

        if (!dateValue || !timeValueD || !timeValueF) {
            console.error('Ambos, la fecha y la hora deben ser seleccionados');
            return;
        }

        // Combinar fecha y hora en una cadena en formato ISO
        const dateTimeStringD = `${dateValue}T${timeValueD}:00`;
        const dateTimeStringF = `${dateValue}T${timeValueF}:00`;

        // Crear un objeto Date usando la cadena combinada
        const fechaDisp = new Date(dateTimeStringD);
        const fechaFinal = new Date(dateTimeStringF);

        //const newExam = { examName, description, fechaFinal, totalQuestions, aleatoryQ, fechaDisp, theme, teacherId};
        const newExam = {
            id_examen: 0,
            nombre: examName,
            descripcion: description,
            tiempo: fechaFinal, // Formato de fecha
            num_preguntas: totalQuestions,
            num_preguntas_aleatorias: aleatoryQ,
            fecha_y_hora_disponible: fechaDisp, // Formato de fecha
            tema_titulo: theme,
            docent_id_doncente: teacherId
        };
        try {
            const response = await fetch('http://localhost:3001/api/examenes/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newExam)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Examen creado:', result);
                // Aquí puedes añadir lógica adicional, como limpiar el formulario o mostrar un mensaje de éxito.
            } else {
                console.error('Error al crear el examen:', response.statusText);
                // Aquí puedes añadir lógica adicional para manejar errores, como mostrar un mensaje de error.
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            // Aquí puedes añadir lógica adicional para manejar errores de red, como mostrar un mensaje de error.
        }
        event.preventDefault();
        //setMostrarFormulario(false); // Ocultar el formulario al presionar el botón de crear examen
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
                                <label>Hora Limite:</label>
                                <input
                                    type="time"
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
                            <div className="form-group-CE right-column">
                                <label>Preguntas aleatorias:</label>
                                <input
                                    type="number"
                                    value={aleatoryQ}
                                    onChange={(e) => setAleatoryQ(e.target.value)}
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className="form-group-CE">
                            <button type="button" className="submit-button" onClick={handleExamCreation}>Crear</button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="back-arrow-Agg" onClick={() => setMostrarFormulario(true)}>
                        <FiArrowLeft/>
                    </div>
                    <AgregarPreguntas teacherId={teacherId} cursoId={cursoId}/>
                </>
            )}
        </div>
    );
};

export default CrearExamen;
