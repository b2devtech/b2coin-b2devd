import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import logo from '/assets/b2coin.png';
import wallet from '/assets/wallet.png';
import linkedin from '/assets/174857.png';
import site from '/assets/6471842.png';
import 'react-toastify/dist/ReactToastify.css'; // import first
import { ToastContainer, toast } from 'react-toastify'; // then this
import abi from './utils/WavePortal.json';



export default function App() {
 

     /*
   * Método para consultar todos os tchauzinhos do contrato
   */
  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        /*
         * Chama o método getAllWaves do seu contrato inteligente
         */
        const waves = await wavePortalContract.getAllWaves();
        const waveTxn = await wavePortalContract.wave("esta é uma mensagem");

        /*
         * Apenas precisamos do endereço, data/horário, e mensagem na nossa tela, então vamos selecioná-los
         */
        let wavesCleaned = [];
        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });

        /*
         * Armazenando os dados
         */
        setAllWaves(wavesCleaned);
      } else {
        console.log("Objeto Ethereum não existe!")
      }
    } catch (error) {
      console.log(error);
    }
  }

 
  const [currentAccount, setCurrentAccount] = useState("");

   const contractAddress = "0xfB11EB37bB2F2660D53fA8D55D1D3E3F7e9964D3";
   const contractABI = abi.abi;
 
 const [allWaves, setAllWaves] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        
        toast.success('Conecte-se a carteira Metamask');
        //console.log("Conecte-se a carteira Metamask instalada!");
        return;
      } else {
       toast.success('Blockchain Ethereum reconhecida');
       
        
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
         toast.success('Encontrada a conta autorizada:' + account);
        setCurrentAccount(account);
         getAllWaves();
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
        
        /*
        * Executar o tchauzinho a partir do contrato inteligente
        */
        const waveTxn = await wavePortalContract.wave();
        console.log("Minerando...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Minerado -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Total de tchauzinhos recuperado...", count.toNumber());
        getAllWaves();
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
        <button  className="snip1564"  onClick={wave}>
          Fazer Transação 
        </button>
         
        {/*
        * Se não existir currentAccount, apresente este botão
        */}
        {!currentAccount && (
          <button className="snip1564"    onClick={connectWallet}>
            <img src={wallet}  width="30px" />  Conectar carteira
          </button>
     
        )}

  {allWaves.map((wave, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Endereço: {wave.address}</div>
              <div>Data/Horário: {wave.timestamp.toString()}</div>
              <div>Mensagem: {wave.message}</div>
            </div>)
        })}
        
      </div>
    </div>
  );
}
