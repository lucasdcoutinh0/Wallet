import {Navbar, Container, NavDropdown, Nav, Button} from 'react-bootstrap'
import {IoPersonOutline} from 'react-icons/io5'
function App() {
  return (
<div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
          <Navbar.Brand href="#home">Wallet</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
          <Nav>
            <span className="px-2"><Button>Connect</Button></span>
              <button className="px-2"><span style={{color: "white"}}><IoPersonOutline/></span></button>
          </Nav>
      </Navbar.Collapse>
    </Container>
    </Navbar>
</div>
  );
}

export default App;
