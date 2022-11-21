import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useState,useContext,createContext } from "react";
import { Contract , ethers} from "ethers";
import { solarzuAddress,abi} from "../constants/index"
import HDWalletProvider from "@truffle/hdwallet-provider";
import { OpenSeaPort, Network } from 'opensea-js'
import { useConnect ,useDisconnect, useAccount,useSigner,useSignMessage} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import axios from 'axios';

export const solarzuContext = createContext();
export default function Layout({children}){
    const [modal, setModal] = useState(false)
    const [details, setDetails] = useState(null)
    const [home,setHome] = useState(true);
    const [connected, setConnected] = useState(false);
    const [provider,setProvider] = useState(null);
    const [contract,setContract] = useState(null);
    const [seaport,setSeaport] = useState(null);
    const [account,setAccount] = useState(null);
    const [url,setUrl] = useState("");
    const [repayments,setRepayments] = useState({"instalments_left":0});
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const signer  = useSigner()
    
    const networks = {
        mumbai: {
          chainId: `0x${Number(80001).toString(16)}`,
          chainName: "Mumbai Testnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
          },
          rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
          blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
        }
    }
    const connectWallet = async () => {
        try{
            if (isConnected) {
                await disconnectAsync();
            }
            const { account, chain } = await connectAsync({ connector: new InjectedConnector() });
            if(chain.id != 80001){
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            ...networks["mumbai"]
                        }
                    ]
                })
            }
            const userData = { address: account, chain: chain.id, network: 'evm' };
            const { data } = await axios.post('/api/auth/request-message', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const message = data.message;
            // signing the received message via metamask
            const signature = await signMessageAsync({ message });
    
            console.log(signature)
            const provider = new ethers.providers.Web3Provider(window.ethereum,"any");           
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            console.log(signer);
            setProvider(signer);
            setAccount(await signer.getAddress())
            const contract = new Contract(solarzuAddress,abi,signer)
            setContract(contract);
            setRepayments(await contract.users(await signer.getAddress()));
            setConnected(true);
            
        }
        catch(err){
            alert(err.message);
        }
    }
    
    
    const disconnect = async() => {
        setConnected(false);
        setProvider(null);
        setContract(null);
        setAccount(null);
    }

    const changeHome = () =>{
        setHome(!home);
    }

    const getDetails = async(url)=>{
        const tokenDetails = url.split("/");
        const tokenId = tokenDetails[tokenDetails.length - 1];
        const tokenAddress = tokenDetails[tokenDetails.length - 2];
        const data = await fetch(`https://api.covalenthq.com/v1/5/tokens/${tokenAddress}/nft_metadata/${tokenId}/?quote-currency=USD&format=JSON&key=ckey_4760467d5dde4c2f902585f848d`)
        const json = await data.json();
        setDetails(json.data.items[0].nft_data[0].external_data);
        setModal(true)
    }

    

    const accountAddress= process.env.NEXT_PUBLIC_OWNER_ADDRESS;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const providerUrl= process.env.NEXT_PUBLIC_ALCHEMY_URL;
  useEffect(() => {
    
      let walletProvider = new HDWalletProvider({
        privateKeys: [
            PRIVATE_KEY
        ],
        providerOrUrl: providerUrl
    });
    
      
    setSeaport(new OpenSeaPort(walletProvider, {
        networkName: 'goerli',
        apiKey: ""
    },))
    
  },[])
    
    
    
    return(
        <solarzuContext.Provider value={{
            changeHome,
            connectWallet,
            disconnect,
            connected,
            setHome,
            home,
            contract,
            provider,
            account,
            seaport,
            modal,
            getDetails,
            details,
            setModal,
            url,
            setUrl,
            repayments
            }}>
            <Navbar home = {home}/>
            {children}
        </solarzuContext.Provider>
    )
}

