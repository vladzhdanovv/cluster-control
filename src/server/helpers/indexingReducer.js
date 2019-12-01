module.exports = field => (acc, item) => Object.assign(acc, {[item[field]]: item});
