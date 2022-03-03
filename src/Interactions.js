import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import {useState} from 'react'

const Interactions = (props) => {
    const [transferHash, setTransferHash] = useState(null)

	const transferHandler = async (e) => {
		e.preventDefault();
		let transferAmount = e.target.sendAmount.value;
		let recieverAddress = e.target.recieverAddress.value;

		let txt = await props.contract.transfer(recieverAddress, transferAmount);
		console.log(txt);
		setTransferHash("Transfer confirmation hash: " + txt.hash);
	}
    return(
       <div>
           <Container>
            <Row>
                <Col>
                   <Form onSubmit={transferHandler}>
                        <Form.Group className="px-3 pt-2">
                            <Form.Label>Account Address:</Form.Label>
                            <Form.Control className="text-center" id='recieverAddress' style={{width: '400px'}} placeholder="Enter the address you want to transfer to"></Form.Control>
                        </Form.Group>
                        <Form.Group className="px-3 pt-2">
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control className="text-center" id='sendAmount' style={{width: '400px'}} placeholder="Enter the amount you want to transfer"></Form.Control>
                        </Form.Group>
                    <div className="px-3 pt-4">
                        <Button style={{width: '400px'}} type="submit" variant="success">Send</Button>
                    </div>
                    </Form>
                </Col>
                   <Col>
                   <div className="pt-2">
                   Result: {transferHash}
                   </div>
                   </Col>
            </Row>
           </Container>
       </div>
    )
}
export default Interactions