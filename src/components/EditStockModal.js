import React, { useEffect } from 'react';
import { Row, Button, Modal, Container } from 'react-bootstrap';
import StockCard from './StockCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchpopularStocks, selectPopularStock, takeBackUpStocks, resetPopularStocks } from '../redux';


function EditStockModal(props) {

    const { popularStocks = {} } = useSelector((state) => state);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchpopularStocks());
    }, [dispatch]);


    useEffect(() => {
        dispatch(takeBackUpStocks());
    }, [dispatch]);

    const handleChange = (e) => {
        e.stopPropagation();
        const item = e.target.name;
        const isChecked = e.target.checked;
        dispatch(selectPopularStock(item, isChecked));
    }

    const resetSelectedStocks = (e) => {
        props.onHide();
        dispatch(resetPopularStocks());
        dispatch(takeBackUpStocks());
    }

    const saveSelectedStocks = (e) => {
        props.onHide();
        dispatch(takeBackUpStocks());
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="edit-modal-header">
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Stocks
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: '50vh', overflow: 'scroll' }}>
                <Container>
                    <Row className="justify-content-center">
                        {Object.keys(popularStocks).map((value, index) => {
                            return (<StockCard isSelectionEnabled={true} key={index} stock={popularStocks[value]} onSelect={handleChange} />)
                        })}
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'space-between' }}>
                <Button variant="secondary" onClick={resetSelectedStocks} >
                    Cancel
                </Button>
                <Button variant="primary" onClick={saveSelectedStocks}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditStockModal;