/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin/ldaps",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
