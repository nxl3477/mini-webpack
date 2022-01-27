(function(moduleMap){

  function require (moduleId) {  
    const [ fn, mapping ] = moduleMap[moduleId]
    const module = {
      exports: {}
    };


    function localRequire(filePath) {
      const id = mapping[filePath]
      return require(id)
    }
  
    fn(localRequire, module, module.exports)
  
    return module.exports
  }


  require(0)
  

}({
  0: [function (require, module, exports) {
    const { aInit } = require('./a.js') 
    aInit()
  }, {
    './index.js': 0,
    './a.js': 1
  }],
  1: [function (require, module, exports) {
    const b = require('./b.js') 
    const c = require('./c.js')
    module.exports = {
      aInit () {
        console.log('a init')
      }
    }
  }, { './b.js': 2, './c.js': 3 }],
  2: [function () {
    console.log('b import')
  }, { }],

  3: [function () {
    console.log('c import')
  }, {}]
}))

