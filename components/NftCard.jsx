import Image from "next/image"
import React from "react"
import { solarzuContext } from "../components/layout";
import { useContext, useEffect , useState} from "react";
const NftCard = (props) => {
  const openModal = () => {
    window.location.href = 'checkout?tokenUrl='+props.data.openseaUrl;
  }
  return (
    <div className="bg-[#222222] w-60  rounded p-2  space-y-2 mx-auto">
      <div className="image border-[3px] border-[#FF005C] rounded-md">
      <Image
      src={props.data.imageUrl}
      alt="NFT collection"
      height={150}
      width={150}
      layout="responsive"
      priority
    ></Image> 
      </div>
      <div className="border-[3px] border-[#FFB800] mt-2 rounded-md pl-2">
        <p className="text-white ">Name :- {props.data.name}</p>
        <p className="text-white ">Price :- {props.data.price} ETH</p>
      </div>
      <div className="buttn mx-auto font-semibold text-center  text-2xl ">
      <button className="w-11/12 h-10 tracking-widest rounded-md  bg-gradient-to-r from-[#FF00A8] to-[#FF9900]  hover:scale-105 hover:duration-300 " onClick={openModal}>CHECKOUT</button>
      </div>
      </div>
  )
}

export default NftCard
