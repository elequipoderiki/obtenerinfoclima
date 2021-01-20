import {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {


    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais: ''
    });

    //useStates
    const [consultar, guardarConsultar] = useState(false);
    const [resultado, guardarResultado] = useState({});
    const [error, guardarError] = useState(false);

    const {ciudad, pais} =busqueda;

    useEffect(() => {
        const consultarAPI = async () => {
            if(consultar){

                const appId = 'd7260bab52301ec6992d59e5b535116f';
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                guardarResultado(resultado);
                
                //si dejamos consultar en true se asume que el state 
                //no presenta cambios, por lo tanto no se ejecuta esta
                //funcion. es necesario revertir el valor del state a 
                //false para que este efecto vuelva a funcionar
                //pues en cada submit se le asigna el valor true
                guardarConsultar(false);

                //detecta si hubo resultados correctos en la consulta
                if (resultado.cod === "404") {
                    guardarError(true);
                } else {
                    guardarError(false);
                }

            }
        }
        consultarAPI();
        //eslint-disable-next-line
    }, [consultar]);
    
    let componente;
    if(error){
        componente = <Error mensaje="No hay resultados" />
    } else {
        componente = <Clima 
                        resultado = {resultado}
                        />
    }

    return (

        <Fragment>
            <Header 
                titulo = 'Clima React App'
            />
            <div className="contenedor-form">
                <div className="container">
                    <div className="row">
                        <div className="col m6 s12">
                            <Formulario
                                busqueda={busqueda}
                                guardarBusqueda={guardarBusqueda}
                                guardarConsultar={guardarConsultar}
                            />
                        </div>
                        <div className="col m6 s12">
                            {componente}
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
