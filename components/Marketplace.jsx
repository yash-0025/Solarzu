import React from "react"
import NftCard from "./NftCard"
import {data} from "../constants/index"
const Marketplace = () => {
  return (
    <div className="bg-[#000000] mx-auto  ">
    <h1 className="text-white text-5xl font-semibold underline text-center p-3 mb-8 tracking-widest">MarketPlace</h1>
      <div className=" p-2 md:flex  space-y-3 ">
        <NftCard data={data[0]}/>
        <NftCard data={data[1]}/>
        <NftCard data={data[2]}/>
      </div>
      <div className="p-2 md:flex space-y-3">
        <NftCard data={data[3]}/>
        <NftCard data={data[4]}/>
        <NftCard data={data[5]}/>
      </div>
    </div>
  )
}

export default Marketplace
