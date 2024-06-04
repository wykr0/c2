import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from '../components/Spinner';
import ChucksFacts from "../components/ChucksFacts";

function InfoPanel() {
    const [loaded, setDataLoaded] = useState(false);
    const [chuckData, setChuckData] = useState([]);
    const [searchWord, setSearchWord] = useState(""); 
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (searchWord && !loaded) {
                try {
                    const result = await axios.get(`https://api.chucknorris.io/jokes/search?query=${searchWord}`);
                    if (result.data) {
                        setDataLoaded(true);
                        setChuckData(result.data.result); 
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

    const addToFavorites = (fact) => {
        setFavorites([...favorites, fact]);
    };

    return (
        <div className="App">
            <Spinner dataLoaded={loaded} />
            <ChucksFacts chucks ={chuckData} onSearch={handleSearch} /> {/* Pasar la función como prop */}
        </div>
    );
}

export default InfoPanel;