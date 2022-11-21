export const solarzuAddress = "0x14751F6bF4c4F7E5d2c94EaebBd2C94c7128F147";

export const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "total_amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "instalment_amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "instalments",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "name": "BNPL",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "instalment_amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "instalments_left",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "name": "INSTALMENT_PAID",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "total_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "instalments",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_instalment_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      }
    ],
    "name": "divide_installments",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "instalments_amount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "instalments_left",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "repayment",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "used_amount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "used",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "instalment_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "instalments_left",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]

export const data = [
  {
    name : "Ape #1",
    openseaUrl : "https://testnets.opensea.io/assets/goerli/0x904490ab5cd0d7f6e2264b5d34d46a9c1bb30594/1",
    imageUrl : "https://i.seadn.io/gae/GzzoomNljSDSjdewK2wkInX0XoPIBpsNKO0GSA1x1O3JzlRXLZ6UN2DL8yCi46WJy_EfEh13u-x72sPhzp2sj1RjVXvzXiTvPXMG?auto=format&w=1000",
    price : 0.1 
  },
  {
    name : "Digi #1885",
    openseaUrl : "https://testnets.opensea.io/assets/goerli/0xb12af1b18bb38cdee28c4a791c3500d6d7b117c4/1885",
    imageUrl : "https://i.seadn.io/gae/VTEPciV7hYt58VqPRY58buztcIZewLEesFrY-6oLfWorpS0hhmjI7_05Di1sp8QV-7s_niJ_is15X-YK5cjGcmCR7uulxOBig0hQ?auto=format&w=1000",
    price : 0.01

  },
  {
    name : "Lucid Kiddos#21",
    openseaUrl : "https://testnets.opensea.io/assets/goerli/0x86edf4b22a1daa6edfcae9d516748b1edad6725c/21",
    imageUrl : "https://i.seadn.io/gae/PoW96dzVKuxPVdQ0Mx0v-yOoaVx6aRkVdlTiMo4BEHnpkLL17zfhUyuVcr88T65SfcKwN_vgoywzBr1BgRPN8VbhMLz0_AD_wfzVb1g?auto=format&w=1000",
    price : 0.01

  },
  {
    name : "Unique Squid #95",
    openseaUrl : "https://testnets.opensea.io/assets/goerli/0xe710eaa1f910ca3b99a172a16bddf50a74e9ae61/95",
    imageUrl : "https://i.seadn.io/gae/AqcbO1nIGLhOVn8D9JS-8sco2XS2Z5W-Lg-i8N_tHc7d4ReEM_uRA5i9P4u4kT_WLJr0FtSnoQ_l96ewsqokEBfNhF7sguZQ_sC0?auto=format&w=1000",
    price : 0.01

  },
  {
    name : "Ape #318",
    openseaUrl : "https://testnets.opensea.io/assets/goerli/0x410c0ed7d3cb708a6fa291ac4936da95c797d3f8/318",
    imageUrl : "https://i.seadn.io/gae/QFu63T6GPu93A5vfLwhRyfuv2qbB60Wbaa4CUSA3BXG0Vc9v1u1gzaSp5GPK1o1Vt-IYLEpPlOMNrpwBxmLmXZIHDix1u9UbaVgKLQ?auto=format&w=1000",
    price : 0.1

  },
  {
    name : "Digi #679",
    openseaUrl : "https://testnets.opensea.io/assets/goerli/0xb12af1b18bb38cdee28c4a791c3500d6d7b117c4/679",
    imageUrl : "https://i.seadn.io/gae/c6kLceW8U1nUMai8_hsgnbBI8gI86lPr8Nm1BSuU3PZ6VTOLqpDNsJJOkivL6yRh0L72jZuivVeNK6ygaMTjCUxNY5niKJqoHUgTTg?auto=format&w=1000",
    price : 0.07

  }
]