import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from '../components/Spinner';
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import ChucksFacts from "../components/ChucksFacts";

function InfoPanel() {
    const [loaded, setDataLoaded] = useState(false);
    const [chuckData, setChuckData] = useState([]);
    const [searchWord, setSearchWord] = useState(""); 
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

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

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites); // Alterna entre mostrar y ocultar favoritos
    };

    return (
        <div className="App">
            <Spinner dataLoaded={loaded} />
            <Row style={{ height: "50px", backgroundColor: 'grey' }}>
                    <Col>
                        <h2>Chuck Norris Facts</h2>
                    </Col>
                    <Col>
                        <Button
                                type='button'
                                size='lg'
                                onClick={toggleFavorites}
                                style={{ backgroundColor: "grey", textTransform: "uppercase", border: "none" }}
                            >
                                <label>Favoritos ❤</label>
                        </Button>
                    </Col>
                </Row>
            
            {!showFavorites ? (
                <ChucksFacts 
                    chucks={chuckData} 
                    onSearch={handleSearch} 
                    addToFavorites={addToFavorites} 
                />
            ) : (
                <>
                    <ul style={{ marginLeft: '30px', textAlign: 'left', listStyleType: 'none', paddingLeft: 0, marginTop: '30px' }}>
                        {favorites.map((fact, index) => (
                            <li key={index}>
                            <h2>Fact:</h2>
                            <label>{fact.value}</label>
                            <br />
                            <br />
                            <h6>Fecha:</h6>
                            <label>{fact.created_at}</label>
                            <br />
                            <br />
                            <h6>Categories:</h6>
                            <label>{fact.categories.join(', ')}</label> {/* Concatenar las categorías en una cadena */}
                        </li>
                        ))}
                    </ul>
                </>
            )}

        </div>
    )
}

export default InfoPanel;