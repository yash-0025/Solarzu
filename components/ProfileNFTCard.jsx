import React from "react"

const ProfileNFTCard = (props) => {
  return (
    <div className="bg-[#333333] md:w-2/5 h-16 rounded-md mx-2 md:mx-5 my-2 md:my-5 ">
      <div className="pt-2 pl-3 flex">
        <img
          src="1.png"
          alt="sample nft"
          className="h-12 w-12 rounded-full border-2 "
              />
              <p className="mx-4 font-semibold text-xl md:text-xl  self-center align-middle">{ props.nftName}</p>
      </div>
    </div>
  )
}

export default ProfileNFTCard
