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
  
      "0": [function (require, module, exports) {
        "use strict";

var _a = require("./a.js");

(0, _a.aInit)();
      }, {"./a.js":1} ],
  
      "1": [function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aInit = void 0;

var _b = _interopRequireDefault(require("./b.js"));

var _c = _interopRequireDefault(require("./c.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var aInit = function aInit() {
  console.log('a init');
};

exports.aInit = aInit;
      }, {"./b.js":2,"./c.js":3} ],
  
      "2": [function (require, module, exports) {
        "use strict";

console.log('b import');
      }, {} ],
  
      "3": [function (require, module, exports) {
        "use strict";

console.log('c import');
      }, {} ],
  
}))

