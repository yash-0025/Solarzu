import React from "react"
import ProfileNFTCard from "../components/ProfileNFTCard"

const Profile = () => {
  return (
    <>
      <div className="text-white  flex flex-row justify-center">
        <div className="bg-[#222222] md:h-40 w-11/12  text-center rounded-lg mt-6">
          <p className="text-[#5d5d5d] py-16 ">Add Cover Photo </p>
        </div>
      </div>
      <div className="nameSection flex ">
        <div className="h-20 w-20 rounded-full border-2 border-white mt-5 mx-5 md:mx-12 ">
          <img src="1.png" alt="" className="rounded-full h-18 w-18" />
        </div>
        <div className="flex flex-row justify-between w-3/5 md:w-4/5">
          <div className="mt-9 md:tracking-widest ">
            <p className=" text-white font-normal text-xl ">Yash Patel</p>
            <p className=" text-[#7a7a7a] font-normal text-xs ">@yash-patel</p>
          </div>
          <div className="btn  self-center  ">
            <button className="item-end self-end font-medium bg-banner text-white h-10 w-24 rounded-lg hover:scale-105 duration-300">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div className="detailSection flex justify-center my-10">
        <div className=" bg-gradient-to-r from-[#FA01FF]  to-[#00F0FF]  w-11/12 rounded-lg md:flex h-fit">
          <div className="holdingSection md:w-2/5 bg-[#4F4F4F] bg-opacity-40 my-5  mx-5 rounded-md text-white md:h-fit ">
            <h1 className="text-center text-2xl p-2 font-semibold tracking-wider mt-2">
              Crypto Holdings
            </h1>
            <div className="mx-2 text-xl my-3 p-4 font-medium ">
              <div className="flex justify-between">
                <p className="my-3">ETH :- </p>
                <p className="my-3">99.99</p>
              </div>
              <div className="flex justify-between">
                <p className="my-3">ETH :- </p>
                <p className="my-3">99.99</p>
              </div>
              <div className="flex justify-between">
                <p className="my-3">ETH :- </p>
                <p className="my-3">99.99</p>
              </div>

            </div>
          </div>
          <div className=" md:w-3/5 bg-[#4F4F4F] bg-opacity-40 my-5 mx-5 rounded-md text-white h-fit ">
            <h1 className="text-center text-2xl p-2 font-semibold tracking-wider  mt-2">
              NFTs
            </h1>
            <div className="nftHoldings md:flex md:flex-wrap md:self-center md:mx-auto md:justify-center">
              <ProfileNFTCard nftName="The Hands" />
              <ProfileNFTCard nftName="Painter Clubs" />
              <ProfileNFTCard nftName="Yacht Club" />
              <ProfileNFTCard nftName="Brown Cats" />
            </div>
          </div>
        </div>
      </div>

      <div className="wallets"></div>
    </>
  )
}

export default Profile
