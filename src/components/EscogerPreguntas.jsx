import React, {useEffect, useState} from "react";
import '../styles/EscogerPreguntasStyle.css'

const EscogerPreguntas = ({tema, num_preguntas, nombre}) => {

    const [preguntas, setPreguntas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/preguntas/${tema}`);
                const data = await response.json();
                setPreguntas(data);
            } catch (error) {
                console.error('Error al obtener estudiantes:', error);
            }
            console.log(preguntas);
        };

        fetchData();
    }, []);

    const [contador, setContador] = useState(0);
    const [preguntasSeleccionadas, setPreguntasSeleccionadas] = useState([]);

    const handleChange = (event) => {
        const isChecked = event.target.checked;
        const id = event.target.id;
        console.log(id);
        setContador(isChecked ? contador + 1 : contador - 1);

        if (isChecked) {
            setPreguntasSeleccionadas((prevPreguntasSeleccionadas) => [
                ...prevPreguntasSeleccionadas,
                id,
            ]);
        } else {
            setPreguntasSeleccionadas((prevPreguntasSeleccionadas) =>
                prevPreguntasSeleccionadas.filter((pregunta) => pregunta !== id)
            );
        }
    };

    async function insertarPreguntas() {
        if (contador > num_preguntas) {
            alert(`No se pueden escoger más de ${num_preguntas}`);
        } else {
            try {
                const response = await fetch(`http://localhost:3001/api/preguntas/escoger/${nombre}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(preguntasSeleccionadas)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Preguntas escogidas:', result);
                    // Aquí puedes añadir lógica adicional, como limpiar el formulario o mostrar un mensaje de éxito.
                } else {
                    console.error('Error al crear los registros:', response.statusText);
                    // Aquí puedes añadir lógica adicional para manejar errores, como mostrar un mensaje de error.
                }
            }catch (error){
                console.error('Error al realizar la solicitud:', error);
            }
        }
    }

    return(
        <div className="containerListas">
            <div className="text-container">
                <h1 className="gradient-text">Escoger Preguntas</h1>
            </div>
            <ul className="listaPreguntas">
                {preguntas.map((pregunta) => (
                    <li key={pregunta.ID_PREGUNTA}>
                        <input type="checkbox" onChange={handleChange} id={pregunta.ID_PREGUNTA}/>
                        {pregunta.DESCRIPCION}
                    </li>
                ))}
            </ul>
            <button onClick={insertarPreguntas} className="role-button">Terminar</button>
        </div>
    );
}

export default EscogerPreguntas;
