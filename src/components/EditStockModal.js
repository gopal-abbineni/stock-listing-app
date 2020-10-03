import React, { useEffect, useCallback } from 'react';
import { Row, Button, Modal, Container } from 'react-bootstrap';
import StockCard from './StockCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchpopularStocks, saveMyStocks } from '../redux';


function EditStockModal(props) {
    console.log("Rendering EditStockModal");
    
    let selected = {}
    const {popularStocks, myStocks} = useSelector((state) => { return {
        popularStocks: state.popularStocks,
        myStocks: state.myStocks
    }});
    
    const dispatch = useDispatch();

    useEffect(() => {
        myStocks.map((value, index)=>{
            selected[value] = true; 
        })
        dispatch(fetchpopularStocks());
    }, [dispatch]);

    const handleChange = useCallback((item, isChecked) => {
        if(isChecked){
            selected[item] = isChecked;
        } else {
            delete selected[item];
        }
    },[]);

    const saveSelectedStocks = useCallback((e) => {
        props.onHide();
        dispatch(saveMyStocks(Object.keys(selected)))
    },[]);

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
                            return (<StockCard isSelectionEnabled={true} key={index} stock={popularStocks[value]} isSelected={myStocks.indexOf(value)!=-1} onSelect={handleChange} />)
                        })}
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'space-between' }}>
                <Button variant="secondary" onClick={props.onHide} >
                    Cancel
                </Button>
                <Button variant="primary" onClick={saveSelectedStocks}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default React.memo(EditStockModal);