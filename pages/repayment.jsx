import Image from "next/image"
import React from "react"
import Navbar from "../components/Navbar"
import { solarzuContext } from "../components/layout";
import { useState , useContext, useEffect} from "react"
import { solarzuAddress } from "../constants";
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Repayment = () => {
  const {connectWallet, connected ,repayments,disconnect,contract,provider,seaport,modal,setModal,setUrl,url} = useContext(solarzuContext);
  const [details,setDetails] = useState(null);

  const getDetails = async()=>{
    const tokenId = ethers.BigNumber.from(repayments.tokenId).toNumber();
    const tokenAddress = repayments.tokenAddress;
    setDetails(await seaport.api.getAsset({
      tokenAddress,
      tokenId
    }))
  }

  const wallets = {
    MATIC: { address: solarzuAddress},
  };

  const repay = async()=>{
    try{
      console.log(contract);
      const tx = await contract.repayment({value:repayments.instalment_amount});
      await tx.wait();
      toast.success("Repayment Successfull");
    }
    catch(err){
      if(err.code == -32603){
        alert("Insufficient Funds For completing Transaction")
      }
      else{
        alert(err.message);
      }
    }
  }

  useEffect(() => {
    console.log(connected)
    if(connected){
      console.log("yes");
      getDetails();
    }
  },[connected])
  
  console.log(details);
  return (
    <>
      {/*   <Navbar /> */}

      <div className="bg-[#0f0f0f] h-screen p-10 mx-auto w-full">
          {

            !connected ? 
            <div className="flex justify-center">
              <button
              onClick={connectWallet}
              className="bg-black  w-44 h-10 mb-5 rounded-xl hover:scale-105 duration-500 bg-gradient-to-r from-[#FF00A8] to-[#FF9900] text-xl font-semibold "
             > Connect Wallet</button>
            </div>
             
             :
             repayments.instalments_left === 0 || details === null?

              <div className="text-white  text-center  border-2  md:w-1/2  mx-auto mt-10 rounded-lg border-[#FF005C]">
                <div className="p-5 flex flex-col text-center ">
                <span >You have no repayments to be made at a current time.</span>
                <span>You can Buy the NFT from the marketplace.</span>
                </div>
              </div>
            :

          
        <div className="bg-[#202020] mx-auto md:w-2/6 rounded-xl ">
          <div className="text-white text-center flex flex-col items-center w-full">
            <h1 className="text-2xl font-thin underline tracking-wider pt-4">
              Repayment
            </h1>
            <div className="mt-6">
              <img
                src={details.imageUrl || ""}
                alt="nft-image"
                width={150}
                height={150}
                className="rounded-xl"
                
              />
            </div>
            <div className="text-left  mt-5 space-y-3 pb-9 font-medium p-3">
              <p>Name :- {details.name}</p>
              <p>Id :- {details.tokenId}</p>
              <p>Price :- {ethers.utils.formatEther(repayments.used)} MATIC</p>
              <p>Repayment Amount :- {ethers.utils.formatEther(repayments.instalment_amount)} MATIC</p>
              <p>Instalments Left :- {ethers.BigNumber.from(repayments.instalments_left).toNumber()}</p>
            </div>
            <button
              onClick={repay}
              className="bg-black w-3/4 h-10 mb-5 rounded-xl hover:scale-105 duration-500 bg-gradient-to-r from-[#FF00A8] to-[#FF9900] text-xl font-semibold "
            >
              Repay Now
            </button>
            
          </div>
        </div>
}   
      <ToastContainer />

      </div>
    </>
  )
}

export default Repayment