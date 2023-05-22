import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import logo from '/assets/b2coin.png';
import wallet from '/assets/wallet.png';
import linkedin from '/assets/174857.png';
import site from '/assets/6471842.png';
import 'react-toastify/dist/ReactToastify.css'; // import first
import { ToastContainer, toast } from 'react-toastify'; // then this



export default function App() {

  const notify = () => toast("Conecte-se a carteira Metamask instalada!");

  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        notify
        //console.log("Conecte-se a carteira Metamask instalada!");
        return;
      } else {
       toast.success('Blockchain Ethereum reconhecida');
        
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
         toast.success('Encontrada a conta autorizada:' + account);
        setCurrentAccount(account)
      } else {
        toast.error('Nenhuma conta autorizada foi encontrada');
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implemente aqui o seu método connectWallet
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        toast.success("MetaMask encontrada!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      toast.success("Conectado na carteira: " + accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Recuperado o número de tchauzinhos...", count.toNumber());
      } else {
        console.log("Objeto Ethereum não encontrado!");
      }
    } catch (error) {
      console.log(error)
    }
}

  return (
    <div className="mainContainer" >
         <nav>
          <ul className="list">
              <li className="items">
               <a href="https://www.linkedin.com/in/geraldovianajr/"     target="_blank" rel="noopener noreferrer">
                 <img src={linkedin}  width="30px"/>
      </a>
              </li>
              <li className="items">
                               <a href="https://b2dev.com.br/"     target="_blank" rel="noopener noreferrer">
                 <img src={site}  width="30px"/>
      </a>
                
              </li>
            </ul>
          <button className="btn">BTN</button>
        </nav>
      <div className="dataContainer">
        <center>
        <img src={logo} alt="Logo" width="200px" /> 
        </center>
          <div className="header">
         B2COIN - Projeto de estudos Web3-Cripto
        </div>

        <div className="bio">
       
        </div>
        <button  className="snip1564"  onClick={notify}>
          Fazer Transação 
        </button>
         
        {/*
        * Se não existir currentAccount, apresente este botão
        */}
        {!currentAccount && (
          <button onLoad={notify} className="snip1564"    onClick={connectWallet}>
            <img src={wallet}  width="30px" />  Conectar carteira
          </button>
     
        )}
      </div>
      
    </div>
  );
}
