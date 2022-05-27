module.exports = {
  async rewrites() {
    return [
      {
        // destination: process.env.DESTINATION_URL,
        // source: process.env.SOURCE_PATH,
        source: "/api/:path((?!auth).*)",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  }
};