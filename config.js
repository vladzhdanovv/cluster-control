const config = {
  production: {
    port: 8001,
  },
  development: {
    port: 8001,
  }
};
const env = process.env.NODE_ENV === "production" ? "production" : "development";
module.exports = Object.assign({}, config.all, config[env]);
