/** @type {import('next').NextConfig} */

const nextConfig = {
    // ...rest of options
    swcMinify: true,
    compiler: {
      styledComponents: true,
    },
  }
  
  module.exports = nextConfig