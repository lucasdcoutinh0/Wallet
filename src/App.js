import {Navbar, Container, NavDropdown, Nav, Button, Card} from 'react-bootstrap'
import {IoPersonOutline} from 'react-icons/io5'
import {ethers} from "ethers"
import Brl_Coin_abi from './Contracts/Brl_Coin_abi.json'
import Interactions from './Interactions'
import {React, useState, useEffect} from 'react'
function App() {
  //Rinkeby Contract Address //
  let contractAddres = '0x01145bEe39a95B97bd29737123E3f03601b9e3E4';
  
  const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState(null);
	const [transferHash, setTransferHash] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
        accountChangeHandler(result[0]);
        setConnButtonText('Wallet Connected');
      })
      .catch(error => {
        setErrorMessage(error.message);
      })
    }else {
      console.log('need to install metamask');
      setErrorMessage('Please install metamask');
    }
  }

  const accountChangeHandler = (newAddrewss) => {
    setDefaultAccount(newAddrewss);
    updateEthers();
  }
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);

    let tempSigner = tempProvider.getSigner();

    let tempContract = new ethers.Contract(contractAddres, Brl_Coin_abi, tempSigner)

    setProvider(tempProvider);
    setSigner(tempSigner);
    setContract(tempContract);
  }

  useEffect(() => {
    if(contract != null) {
      updateBalance()
      updateTokenName()
    }
  }, [contract] )

  const updateBalance = async () => {
    let balanceBigN = await contract.balanceOf(defaultAccount)
    let balanceNumber = balanceBigN.toNumber();

    let decimals = await contract.decimals();

    let tokenBalance = balanceNumber / Math.pow(10, decimals);

    setBalance(tokenBalance);
  }

  const updateTokenName = async () => {
    setTokenName(await contract.name())
  }
  return (
<div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
          <Navbar.Brand href="#home">{tokenName + " Wallet"}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
          <Nav>
            <Button variant="outline-light" onClick={connectWalletHandler}>{connButtonText}</Button>
            <NavDropdown align="end" title={<IoPersonOutline style={{color: '#fff', width: '30px', paddingLeft: '10px', paddingTop: '6px', height: '30px'}}/>}>
              <NavDropdown.Item><IoPersonOutline/> Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>{'Account: ' + defaultAccount}</NavDropdown.Item>
              <NavDropdown.Item>{'Balance: ' + balance}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Navbar.Collapse>
    </Container>
    </Navbar>
    <div style={{marginLeft: 'auto', marginRight: 'auto', width: '800px', paddingTop: '50px'}}>
      <Card style={{width: '800px', paddingBottom: '30px'}}>
        <Card.Header className="text-center" >Transfer BRLC</Card.Header>
        <Interactions contract= {contract} />
      </Card>
    </div>
    {errorMessage}
</div>
  );
}

export default App;
