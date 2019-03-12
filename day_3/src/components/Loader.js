import React from 'react';
import {Container, Row, Col} from 'reactstrap'
import LoaderGIF from '../images/loading.gif'

const Loader = () => (
    <Container fluid={true} className="h-100 d-flex justify-content-center align-items-center" id="loading">
        <Row>
            <Col>
                <img src={LoaderGIF} alt=""/>
            </Col>
        </Row>
    </Container>
)
export default Loader
