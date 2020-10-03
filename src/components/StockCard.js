import React, { useCallback } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';

function StockCard(Props) {
    console.log("Rendering StockCard", Props.stock.symbol);

    const [stockSelected, setStockSelected] = React.useState(Props.isSelected || false);

    const stockChecked = useCallback((e) => {
        Props.onSelect(e.target.name, e.target.checked);
        setStockSelected(e.target.checked,[]);
    },[])

    return (
        <Card border={Props.isSelectionEnabled && stockSelected ? "success" : "dark"} style={{ width: '25rem', margin: '10px' }}>
            <Card.Body>
                <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <b>{Props.stock.symbol}</b>
                    {Props.isSelectionEnabled && (
                        <Form.Check type="checkbox" name={Props.stock.symbol} checked={stockSelected} onChange={stockChecked} />
                    )}
                </Card.Title>
                <Row>
                    <Col xs={7} md={7}>
                        <div>
                            <p>
                                High: {Props.stock.week52High}
                            </p>
                            <p>
                                Low: {Props.stock.week52Low}
                            </p>
                        </div>
                        <Card.Link><b>{Props.stock.companyName}</b></Card.Link>
                    </Col>
                    <Col xs={4} md={4}>
                        <div className="text-center">
                            <h3>
                                <b>{Props.stock.latestPrice}</b>
                            </h3>
                            {/* <small style={{ color: Props.stock.change < 0 ? "red" : "green" }}>{Props.stock.change} ({Math.abs(Props.stock.changePercent).toFixed(2)}%)</small> */}
                            <p>
                                Current
                            </p>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default React.memo(StockCard);