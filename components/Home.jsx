import Image from "next/image"
import React from "react"

const Home = () => {
  return (
    <div className="h-full w-full">
      <Image
        src="/Homepage.png"
        alt="Image"
        layout="responsive"
        width={100}
        height={50}
        priority
      />
    </div>
  )
}

export default Home
