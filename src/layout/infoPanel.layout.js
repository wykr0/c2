import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from '../components/Spinner';
import MoviesList from "../components/MoviesList";

function InfoPanel() {
    const [loaded, setDataLoaded] = useState(false);
    const [movieData, setMoviesData] = useState([]);
    const [searchWord, setSearchWord] = useState(""); // Nuevo estado para la palabra buscada

    useEffect(() => {
        const fetchData = async () => {
            if (searchWord && !loaded) {
                try {
                    const result = await axios.get(`https://api.chucknorris.io/jokes/search?query=${searchWord}`);
                    if (result.data) {
                        setDataLoaded(true);
                        setMoviesData(result.data.result); // Suponiendo que la API devuelve una lista en `result`
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
        fetchData();
    }, [searchWord, loaded]); // Añadir `searchWord` y `loaded` como dependencias

    // Función para actualizar la palabra buscada
    const handleSearch = (word) => {
        setDataLoaded(false); // Resetear el estado de carga
        setSearchWord(word);
    };

    return (
        <div className="App">
            <Spinner dataLoaded={loaded} />
            <MoviesList movies={movieData} onSearch={handleSearch} /> {/* Pasar la función como prop */}
        </div>
    );
}

export default InfoPanel;