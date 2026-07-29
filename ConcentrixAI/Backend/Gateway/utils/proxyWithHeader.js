import proxy from "express-http-proxy";

const ProxyWithHeader = (serviceURL) => {
  return proxy(serviceURL, {
    proxyReqOptDecorator: (proxyReqOpts, req) => {
      if (req.user) {
        proxyReqOpts.headers["x-user-id"] = req.user.userid;
      }

      return proxyReqOpts;
    },
  });
};

export default ProxyWithHeader;