import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { useState } from 'react';

function MoviesList(props) {
    const [word, setWord] = useState("");

    const search = () => {
        alert(`buscando ${word}`)
        if (props.onSearch) {
            props.onSearch(word); // Llamar a la función pasada por props con la palabra buscada
        } else {
            console.error("error");
        }
    };

    return (
        <section id="moviesList">
            <Container>
                <Row style={{ height: "50px", backgroundColor: 'grey' }}>
                    <Col>
                        <h2>Chuck Norris Facts</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={7} style={{ marginLeft: '30px' }}>
                        <Form.Group>
                            <br />
                            <Form.Control id="word" type="text" onChange={(e) => setWord(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={4} style={{ marginLeft: '30px' }}>
                    <br />
                    <Button
                            type='button'
                            size='lg'
                            onClick={search}
                            style={{ backgroundColor: "grey", textTransform: "uppercase", border: "none" }}
                        >
                            <label>Buscar</label>
                        </Button>
                    </Col>
                    
                </Row>
                <Row style={{marginTop:30, textAlign:'left'}}>
                    <div className="col-12 text-left">
                        <ul className="arrow-styled">
                            {
                                props.chucks.map((chuck, index) => {
                                    return (
                                        <div key={index} className='row'>
                                            <Row>
                                                <Col>
                                                    <h2>Fact:</h2>
                                                    <label>{chuck.value}</label>
                                                    <br />
                                                    <label>Fecha:</label>
                                                    <label>{chuck.created_at}</label>
                                                    <br />
                                                    <label>categories:</label>
                                                    <label>{chuck.categories}</label>
                                                </Col>
                                                <Col>
                                                    <Button variant={"primary"} 
                                                    size={"sm"} 
                                                    onClick={() => props.addToFavorites(chuck)}
                                                    >❤</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </Row>
            </Container>
        </section>
    );
}

export default MoviesList;