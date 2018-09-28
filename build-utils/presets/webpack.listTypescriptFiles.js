const TestPlugin = require('../plugins/listTypescriptFiles')

module.exports = () => ({
  plugins: [
    new TestPlugin(),
  ]
})
