import Navbar from "./Navbar"
// import styles from "../styles/Home.module.css"
import { useState, useContext, useEffect } from "react"
import Image from "next/image"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { solarzuContext } from "../components/layout"
import HDWalletProvider from "@truffle/hdwallet-provider"
import { OpenSeaPort, Network } from "opensea-js"
import { BigNumber } from "ethers"
import { Web3Storage } from "web3.storage"
import { ToastContainer, toast } from "react-toastify"
import { data } from "autoprefixer"
import { ethers } from "ethers"
import "react-toastify/dist/ReactToastify.css"
import { solarzuAddress } from "../constants"
import { MdMessage } from "react-icons/md"
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
const CoinGecko = require("coingecko-api")
const CheckoutPage = () => {
  const [price, setPrice] = useState(null)
  const [files, setFiles] = useState([])
  const [nftPrice, setNftPrice] = useState(0)
  const [start, setStart] = useState(false)
  const [msg, setMsg] = useState("processing...")
  const {
    connectWallet,
    account,
    connected,
    disconnect,
    contract,
    provider,
    seaport,
    getDetails,
    details,
    modal,
    setModal,
    setUrl,
    url,
  } = useContext(solarzuContext)
  const ethPrice = async () => {
    const CoinGeckoClient = new CoinGecko()
    const priceOfEth = await CoinGeckoClient.simple.price({
      ids: ["ethereum"],
      vs_currencies: ["usd"],
    })
    setPrice(priceOfEth.data.ethereum.usd)
  }
  async function temp() {
    console.log(
      await seaport.getTokenBalance({
        accountAddress: "0x625B892f34ACA436e1525e5405A8fb81eC5cc04d", // string
        tokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      })
    )
  }
  // console.log(temp())
  function makeFileObjects(data) {
    const obj = data
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" })

    const files = [new File([blob], account + ".json")]
    return files
  }
  const storeContent = async (data) => {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });
    
      const abi = [
      {
          path: "data.json",
          content: btoa(JSON.stringify(data)),
      },
      ];
  
    const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi });
    
    console.log(response.toJSON());
  }
  const toggleModal = () => {
    setModal(!modal)
  }
  useEffect(() => {
    ethPrice()
  }, [price])
  const accountAddress = process.env.NEXT_PUBLIC_OWNER_ADDRESS
  const updateDetails = async () => {
    const tokenURL = document.getElementById("tokenURL").value
    // console.log(tokenURL)
    setUrl(tokenURL)
    await getDetails(tokenURL)
  }
  const createBuyOrder = async () => {
    const tokenURL = document.getElementById("tokenURL").value
    const tokenDetails = tokenURL.split("/")
    const tokenId = tokenDetails[tokenDetails.length - 1]
    const tokenAddress = tokenDetails[tokenDetails.length - 2]
    await seaport.createBuyOrder({
      asset: {
        tokenId,
        tokenAddress,
      },
      accountAddress,
      startAmount: nftPrice,
      paymentTokenAddress: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    })
    toast("Created Buy Order Successful")
  }
  const divideInstalments = async (amount, instalments, id, address) => {
    const instalment_amount = Math.round((amount * 10 ** 18) / instalments)
    const tx = await contract.divide_installments(
      BigNumber.from("" + amount * 10 ** 18),
      instalments,
      BigNumber.from("" + instalment_amount),
      id,
      address
    )
    await tx.wait()
  }
  const fee_calculator = (total_amount, interest) => {
    const interest_amount = total_amount * (interest / 100)
    return interest_amount
  }

  const buyNft = async () => {
    try {
      setStart(true)
      const CoinGeckoClient = new CoinGecko()
      const matic = await CoinGeckoClient.simple.price({
        ids: ["matic-network"],
        vs_currencies: ["eth"],
      })
      const maticVal = (1 / matic.data["matic-network"].eth) * nftPrice
      const val = await contract.instalments_left()

      if (val._hex != "0x00") {
        throw new Error("You already have Instalments")
      }
      const tokenURL = document.getElementById("tokenURL").value
      const tokenDetails = tokenURL.split("/")
      let data = {}
      data.user = account
      data.tokenAddress = tokenDetails[tokenDetails.length - 2]
      data.tokenId = tokenDetails[tokenDetails.length - 1]
      data.nftPrice = nftPrice
      data.amount = maticVal
      data.instalments = 3
      data.interest = 2.5
      
      await (
        await provider.sendTransaction({
          to: solarzuAddress,
          value: ethers.utils.parseEther("" + fee_calculator(maticVal, 10)),
        })
      ).wait()
      setMsg("Creating Buy Order")
      await divideInstalments(
        maticVal + fee_calculator(maticVal, 2.5),
        3,
        data.tokenId,
        data.tokenAddress,
        {value: ethers.utils.parseEther("" + fee_calculator(maticVal, 10)),}
      )
      setMsg("placing bid in opensea..")
      await createBuyOrder()
      setMsg("uploading data to IPFS...")

      storeContent(data)
      setModal(false)
      setStart(false)
    } catch (err) {
      if (err.code == -32603) {
        alert("Insufficient Funds For completing Transaction")
      } else {
        alert(err.message)
      }
      setStart(false)
    }
  }

  useEffect(() => {
    if (url != null) {
      document.getElementById("tokenURL").value = url
    }
  }, [url])
  return (
    <div className="flex justify-center mt-10 ">
      <div className="my-auto h-auto w-11/12 md:w-2/4 rounded-lg p-4  bg-[#001f1d] border-[#FF005C] border-2 absolute">
        <h1 className=" tracking-wide font-semibold text-xl mb-4 pb-4 underline text-white">
          Buy Now Pay Later
        </h1>

        <div className="mx-auto relative ">
          <div className="flex flex-col m-2 space-y-4 w-auto rounded-md p-3  ">
            <p className="text-white ">URL :</p>
            <input
              className="h-12 rounded-md pl-[14px] bg-[#0f0f0f] text-white"
              type="text"
              id="tokenURL"
              placeholder="Enter URL"
              required
            ></input>
            <p className="text-white">NFT Price : </p>
            <input
              className="h-12 rounded-md pl-[14px] bg-[#0f0f0f] text-white"
              type="text"
              id="tokenPrice"
              placeholder="Enter NFT Price in ETH"
              onChange={(e) => setNftPrice(e.target.value)}
              required
            ></input>
          </div>
          <div className="flex justify-center">
            <button
              className="h-12 hover:border-white hover:bg-none hover:text-white border-2 w-4/5 text-center  rounded-xl my-3 text-xl md:text-2xl font-semibold tracking-widest bg-gradient-to-r from-[#FF00A8] to-[#FF9900] hover:scale-105 duration-500"
              onClick={updateDetails}
              data-modal-toggle="defaultModal"
            >
              Get Details
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <div  className=" bg-[#000000]  flex justify-center absolute  p-5 rounded-xl w-3/5 md:w-auto h-modal">
          <div className="h-auto w-auto  ">
            <div className="w-auto h-auto ">
              {/*               <h1 className="text-white">CArd</h1> */}
              <div className="text-white text-2xl flex justify-end">
                <button onClick={toggleModal}>
                  <AiOutlineCloseCircle className="mt-1 mr-3" />
                </button>
              </div>
              <div className="flex justify-center">
                <div className="mt-4">
                  <img
                    className="rounded-xl  pt-1"
                    src={details.image_1024}
                    alt="NFT-Logo"
                    height={150}
                    width={150}
                  />
                </div>
              </div>
              <div className="bg-[#d9d9d91a] w-auto h-auto mt- mb-5 justify-self-center relative rounded-lg p-3">
                <div>
                  <h1 className="text-white font-bold underline tracking-wider ">
                    NFT Details
                  </h1>
                  <div className="mt-4 space-y-2">
                    <p className="text-white ">Name : {details.name}</p>
                    <p className="text-white">
                      Price : {(nftPrice * price).toFixed(2)} $
                    </p>
                    <p className="text-white">
                      Interest :{" "}
                      {fee_calculator(nftPrice * price, 10).toFixed(2)} $
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#d9d9d91a] justify-self-center p-3 w-auto h-auto relative rounded-lg ">
                <div>
                  <h1 className="text-white font-bold underline tracking-wider ">
                    Transactions Details
                  </h1>
                  <div className="mt-4 space-y-2 flex flex-col">
                    <div className="flex justify-between">
                      <p className="text-white ">Original Price :</p>
                      <p className="text-white ">
                        {(nftPrice * price).toFixed(2)} $
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-white "> Interest Fees :</p>
                      <p className="text-white ">
                        {fee_calculator(nftPrice * price, 10).toFixed(2)} $
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-white ">Purchase Provider Fees :</p>
                      <p className="text-white ">
                        {fee_calculator(nftPrice * price, 2.5).toFixed(2)} $
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-white ">Total Purchase Fees :</p>
                      <p className="text-white ">
                        {(
                          nftPrice * price +
                          fee_calculator(nftPrice * price, 10) +
                          fee_calculator(nftPrice * price, 2.5)
                        ).toFixed(2)}
                        $
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-auto w-auto relative bg-[#d9d9d91a] mt-6 p-3 rounded-lg">
                <div className="text-left ">
                  <div className="flex justify-between">
                    <p className="text-white  ">Installments : </p>
                    <p className="text-white  ">3</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-white  ">Installments Period: </p>
                    <p className="text-white  ">3 months</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-white ">Amount : </p>
                    <p className="text-white ">
                      {(
                        (nftPrice * price +
                          fee_calculator(nftPrice * price, 2.5)) /
                        3
                      ).toFixed(2)}
                      $/month
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-auto w-auto relative">
                <div className="">
                  <div className="flex justify-around space-x-2 p-3 mt-4 ">
                    <div className="items-center ">
                      <MdMessage className="text-caution text-2xl" />
                    </div>
                    <p className="text-white text-center ">
                      To avail <b>BNPL</b> you have to pay <b>10 %</b> of the{" "}
                      <b> total amount </b> .{" "}
                    </p>
                  </div>
                </div>
              </div>
              
              {connected ? (
                !start ? (
                  <div className="flex justify-center ">
                  <button
                    className=" h-12 hover:border-white hover:bg-none hover:text-white border-2 w-4/5 text-center  rounded-xl my-3 text-xl md:text-2xl font-semibold tracking-widest bg-gradient-to-r from-[#FF00A8] to-[#FF9900] hover:scale-105 duration-500"
                    onClick={buyNft}
                  >
                    BNPL
                    </button>
                    </div>
                    
                ) : (
                  <div className="flex justify-center ">
                  <button
                    className=" h-12 hover:border-white hover:bg-none hover:text-white border-2 w-4/5 text-center  rounded-xl my-3 text-xl md:text-2xl font-semibold tracking-widest bg-gradient-to-r from-[#FF00A8] to-[#FF9900] hover:scale-105 duration-500"
                    disabled={true}
                    >
                    {msg}
                    </button>
                    </div>
                )
              ) : (
                <div className="flex justify-center ">
                <button
                  className="h-12 border-2 w-4/5 text-center  rounded-xl my-3 text-xl md:text-2xl font-semibold tracking-widest bg-gradient-to-r from-[#FF00A8] to-[#FF9900] hover:scale-105 duration-500"
                  onClick={connectWallet}
                >
                  Connect Wallet
                    </button>
                    </div>
              
              )}

              <ToastContainer />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutPage
