/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 
images: {
  domains: ['res.cloudinary.com','openseauserdata.com','lh3.googleusercontent.com','i.seadn.io']
},
webpack: (config, {}) => {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    return config
 },
 output: {
  
  globalObject: 'this',
},
}


module.exports = nextConfig
