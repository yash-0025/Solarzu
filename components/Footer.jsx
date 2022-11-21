import Link from "next/link"

const Footer = () => {
  return (
  
      <div className="bg-[#0F0F0F]">
    <div className="bg-[#0F0F0F] text-white md:flex md:justify-evenly">
      <div className="img flex space-x-3 p-4 md:my-auto">
        <img
          src="/FinalLogo.jpg"
          alt="Logo"
          className="w-9 rounded-full ml-2 md:w-12 md:h-12  "
        />
        <h1 className="font-semibold tracking-widest text-3xl">Solarzu</h1>
      </div>
      <div className="flex flex-col text-center">
        <Link href="/" smooth={true} offset={50} duration={500}>
          <a className="transition duration-300 cursor-pointer px-3 py-2 text-md scroll-smooth tracking-widest text-xl">
            Home
          </a>
        </Link>
        <Link href="https://siddhantsidjlama.gitbook.io/solarzu/" smooth={true} offset={50} duration={500}>
          <a className="transition duration-300 cursor-pointer px-3 py-2 text-md scroll-smooth tracking-widest text-xl">
            Documentation
          </a>
        </Link>
        <Link href="/checkout" smooth={true} offset={50} duration={500}>
          <a className="transition duration-300 cursor-pointer px-3 py-2 text-md scroll-smooth tracking-widest text-xl">
            Checkout
          </a>
        </Link>
        <Link href="/repayment" smooth={true} offset={50} duration={500}>
          <a className="transition duration-300 cursor-pointer px-3 py-2 text-md scroll-smooth tracking-widest text-xl">
            Repayment
          </a>
        </Link>
      </div>
      <div className="social md:my-auto">
        <a
          href="https://www.instagram.com/solar_zu/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row"
        >
          <button className=" mx-auto m-2 flex justify-center cursor-pointer hover:scale-x-110 duration-300 border-solid rounded-lg border-4 border-[#E1425E] text-base font-medium  px-3 py-2  md:text-2xl transition hover:border-amber-400">
            Instagram
            <img
              src="insta.png"
              alt="instagram-logo"
              className="h-6 mx-2  mt-1"
            />
          </button>
        </a>
        <a href=" https://twitter.com/Solarzu2?s=20&t=YA7ySCvTv2xM58ndjW9xAQ" target="_blank" rel="noopener noreferrer">
          <button className="mx-auto m-2 flex justify-center cursor-pointer hover:scale-x-110 duration-300 border-solid rounded-lg border-4 border-[#7D68FF] text-base font-medium  px-3 py-2  md:text-2xl transition hover:border-amber-400">
            Twitter
            <img
              src="Tweeter.png"
              alt="twitter-logo"
              className="h-6 mx-2  mt-1"
            />
          </button>
        </a>
      </div>
      </div>
      
        <p className="text-center text-white py-5 ">Copyright@2022 All Rigts Reserved by Solarzu</p> 
        </div>
      
      )
}

export default Footer
