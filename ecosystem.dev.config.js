module.exports = {
  apps: [
    {
      name: 'cluster-control',
      script: './src/server/index.js',
      watch: ['./src/server/', './package-lock.json'],
    }
  ]
};
