import React from 'react';
import { Row, Container, Button } from 'react-bootstrap';
import StockCard from './StockCard';
import { useSelector } from 'react-redux';
import EditStockModal from './EditStockModal';

function MyStocks(props) {
    console.log("Rendering MyStocks");

    const [modalShow, setModalShow] = React.useState(false);
    const {popularStocks, myStocks} = useSelector((state) => { return {
        popularStocks: state.popularStocks,
        myStocks: state.myStocks
    }});

    return (
        <React.Fragment>
            <Container fluid={true} style={{ paddingLeft: '5%', marginTop: '25px' }}>
                {myStocks.length > 0 ?
                    (
                        <React.Fragment><h5>My Stocks</h5>
                            <Row className="justify-content-center justify-content-lg-start">
                                {myStocks.map((value, index) => {
                                    return <StockCard isDeletionEnabled={true} key={index} stock={popularStocks[value]} />
                                })}
                            </Row>
                            <Row className="justify-content-center">
                                <Button variant="dark" onClick={() => setModalShow(true)}>Edit</Button>{' '}
                            </Row>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Row className="justify-content-center" style={{ marginTop: '10%' }}>
                                <p>No Stocks selected</p>
                            </Row>
                            <Row className="justify-content-center">
                                <Button variant="dark" onClick={() => setModalShow(true)}>Add</Button>{' '}
                            </Row>
                        </React.Fragment>
                    )}
                {modalShow && <EditStockModal show={modalShow} onHide={() => setModalShow(false)} />}
            </Container>
        </React.Fragment>
    );
}

export default React.memo(MyStocks);