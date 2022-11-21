import React, { useState } from "react"
 import { Transition } from "@headlessui/react"
import Link from "next/link"
import { useRouter } from "next/router"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  
  return (
    <div className="bg-[#0f0f0f] p-3 ">
      <nav className="flex justify-between">
        <div className="logo flex text-white space-x-2 ">
          <img
            src="/FinalLogo.jpg"
            alt="logo"
            className="h-10 w-10 rounded-full my-auto"
          />
          <Link href="/">
            <a  className="text-2xl font-bold my-auto tracking-widest">
              SOLARZU
            </a>
          </Link>
        </div>
        <div className="hidden md:block text-white ">
          <div className="ml-10 flex items-baseline space-x-4  ">
            <Link href="https://siddhantsidjlama.gitbook.io/solarzu/" >
              <a className="transition duration-300 cursor-pointer px-3 py-2 text-md scroll-smooth  md:hover:text-[#FF005C] border-2 rounded-xl hover:border-amber-500">
                Documentation
              </a>
            </Link>
            <Link href="/checkout" >
              <a className="transition duration-300 cursor-pointer px-3 py-2 text-md  md:hover:text-[#FF005C] border-2 rounded-xl hover:border-amber-500">
                Checkout
              </a>
            </Link>
            <Link href="/repayment">
              <a className="transition duration-300 cursor-pointer px-3 py-2 text-md   md:hover:text-[#FF005C] border-2 rounded-xl hover:border-amber-500">
                Repayment
              </a>
            </Link>
          </div>
        </div>
        <div className="  md:hidden ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="justify-end p-2 rounded-md text-white  "
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden mx-6 " id="mobile-menu">
              <div
                ref={ref}
                className=" px-2 pt-2 pb-3 space-y-1  border rounded-2xl text-white"
              >
                <Link href="https://siddhantsidjlama.gitbook.io/solarzu/">
                  <a className="cursor-pointer hover:bg-[#FFB800] hover:text-black block px-3 py-2 rounded-md text-base font-medium">
                    Documentation
                  </a>
                </Link>
                <Link href="/checkout">
                  <a className="cursor-pointer hover:bg-[#FFB800]  hover:text-black block px-3 py-2 rounded-md text-base font-medium">
                    Checkout
                  </a>
                </Link>

                <Link href="/repayment">
                  <a className="cursor-pointer hover:bg-[#FFB800]  hover:text-black block px-3 py-2 rounded-md text-base font-medium">
                    Repayment
                  </a>
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  )
}

export default Navbar
