// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gF9Lx":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "222e65dabdea7d65";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"7PGg5":[function(require,module,exports) {
var _question1 = require("./question1");
var _question2 = require("./question2");
var _question3 = require("./question3");
var _question4 = require("./question4");

},{"./question1":"e9OZ6","./question2":"j9quk","./question3":"fvp6c","./question4":"adVMZ"}],"e9OZ6":[function(require,module,exports) {
var _service = require("./service");
var _utils = require("./utils");
_service.getWeather().then(_utils.map(({ lat , lon , locationName , parameter , weatherElement  })=>({
        city: _utils.getCity(parameter),
        town: _utils.getTown(parameter),
        temp: Number(_utils.getTemperature(weatherElement)),
        name: locationName,
        location: {
            lat: Number(lat),
            lon: Number(lon)
        }
    })
))// ignore all accident value
.then(_utils.filter((item)=>!_utils.isAccident(item.temp)
))// get min temp by comp items
.then(_utils.reduce(_utils.compareBy((item1, item2)=>item1.temp < item2.temp
)))// to JSON string
.then(_utils.toJSON)// render
.then(_utils.tap((result)=>_utils.$("answer-1").innerHTML = result
));

},{"./service":"kCmig","./utils":"jxYDB"}],"kCmig":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getWeather", ()=>getWeather
);
parcelHelpers.export(exports, "getPrecipitation", ()=>getPrecipitation
);
parcelHelpers.export(exports, "getForecast", ()=>getForecast
);
var _utils = require("./utils");
var _constants = require("./constants");
const fetchCWB = (endpoint, queries = {
})=>fetch(_utils.fromURL(_constants.HOST)(`api/v1/rest/datastore/${endpoint}`, {
        Authorization: _constants.TOKEN,
        ...queries
    }))
;
const getWeather = _utils.memo(//
_utils.toJSON, (queries)=>fetchCWB("O-A0001-001", queries).then(_utils.parseJSON).then(({ records  })=>records.location
    )
);
const getPrecipitation = _utils.memo(//
_utils.toJSON, (queries)=>fetchCWB("O-A0002-001", queries).then(_utils.parseJSON).then(({ records  })=>records.location
    )
);
const getForecast = _utils.memo(//
_utils.toJSON, (locationId)=>fetchCWB("F-D0047-093", {
        locationId
    }).then(_utils.parseJSON).then(({ records  })=>records.locations
    )
);

},{"./utils":"jxYDB","./constants":"jxEug","@parcel/transformer-js/src/esmodule-helpers.js":"6L0TS"}],"jxYDB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "fromURL", ()=>fromURL
);
parcelHelpers.export(exports, "parseJSON", ()=>parseJSON
);
parcelHelpers.export(exports, "tap", ()=>tap
);
parcelHelpers.export(exports, "map", ()=>map
);
parcelHelpers.export(exports, "filter", ()=>filter
);
parcelHelpers.export(exports, "find", ()=>find
);
parcelHelpers.export(exports, "reduce", ()=>reduce
);
parcelHelpers.export(exports, "groupBy", ()=>groupBy
);
parcelHelpers.export(exports, "sortBy", ()=>sortBy
);
parcelHelpers.export(exports, "take", ()=>take
);
parcelHelpers.export(exports, "head", ()=>head
);
parcelHelpers.export(exports, "$", ()=>$
);
parcelHelpers.export(exports, "toJSON", ()=>toJSON
);
parcelHelpers.export(exports, "compareBy", ()=>compareBy
);
parcelHelpers.export(exports, "isAccident", ()=>isAccident
);
parcelHelpers.export(exports, "memo", ()=>memo
);
parcelHelpers.export(exports, "normalize", ()=>normalize
);
parcelHelpers.export(exports, "monad", ()=>monad
);
parcelHelpers.export(exports, "getBy", ()=>getBy
);
parcelHelpers.export(exports, "getCity", ()=>getCity
);
parcelHelpers.export(exports, "getTown", ()=>getTown
);
parcelHelpers.export(exports, "getTemperature", ()=>getTemperature
);
parcelHelpers.export(exports, "getMaxTemperature", ()=>getMaxTemperature
);
parcelHelpers.export(exports, "getMinTemperature", ()=>getMinTemperature
);
parcelHelpers.export(exports, "getTemperatureDiffPerDay", ()=>getTemperatureDiffPerDay
);
parcelHelpers.export(exports, "getAltitude", ()=>getAltitude
);
parcelHelpers.export(exports, "getPrecipitationPerDay", ()=>getPrecipitationPerDay
);
const fromURL = (base)=>(endpoint, queries = {
    })=>{
        const url = new URL(endpoint, base);
        const format = (str)=>Array.isArray(str) ? str.join() : str
        ;
        Object.entries(queries).forEach(([key, value])=>url.searchParams.append(key, format(value))
        );
        return String(url);
    }
;
const parseJSON = (res)=>res.json()
;
const tap = (fn)=>(param)=>(fn(param), param)
;
const map = (fn)=>(list)=>list.map(fn)
;
const filter = (pred)=>(list)=>list.filter(pred)
;
const find = (pred)=>(list)=>list.find(pred)
;
const reduce = (fn)=>(list)=>list.reduce(fn)
;
const groupBy = (fn)=>(list)=>list.reduce((acc, value)=>{
            const key = fn(value);
            if (!(key in acc)) acc[key] = [];
            acc[key].push(value);
            return acc;
        }, {
        })
;
const sortBy = (comp)=>(list)=>list.slice().sort(comp)
;
const take = (count)=>(list)=>list.slice(0, count)
;
const head = (list)=>list[0]
;
const $ = (id)=>document.getElementById(id)
;
const toJSON = (obj)=>JSON.stringify(obj, null, 2)
;
const compareBy = //
(pred)=>(item1, item2)=>pred(item1, item2) ? item1 : item2
;
const isAccident = (value)=>value === -99
;
function memo(keyfn, fn) {
    const cache = {
    };
    return (args)=>{
        const key = keyfn(args);
        if (!(key in cache)) cache[key] = fn(args);
        return cache[key];
    };
}
const normalize = (items)=>items.map((item)=>{
        if ("elementName" in item && "elementValue" in item) return {
            name: item.elementName,
            value: item.elementValue
        };
        if ("elementName" in item && "time" in item) return {
            name: item.elementName,
            value: item.time.map(({ startTime , endTime , elementValue  })=>({
                    start: new Date(startTime),
                    end: new Date(endTime),
                    value: head(elementValue).value
                })
            )
        };
        if ("parameterName" in item) return {
            name: item.parameterName,
            value: item.parameterValue
        };
        throw new Error(`unexpected item ${JSON.stringify(item)}`);
    })
;
function monad(value) {
    function then(fn) {
        return monad(fn(value));
    }
    function unwrap() {
        return value;
    }
    return {
        then,
        unwrap
    };
}
const assert = (check)=>(item)=>{
        if (!check(item)) throw new Error("assertion error");
        return item;
    }
;
const getBy = //
(target)=>(parameters)=>normalize(parameters).find(({ name  })=>name === target
        )?.value
;
const getCity = (list)=>monad(list).then(getBy("CITY")).then(assert((item)=>typeof item === "string"
    )).unwrap()
;
const getTown = (list)=>monad(list).then(getBy("TOWN")).then(assert((item)=>typeof item === "string"
    )).unwrap()
;
const getTemperature = (list)=>monad(list).then(getBy("TEMP")).then(assert((item)=>typeof item === "string"
    )).unwrap()
;
const getMaxTemperature = (list)=>monad(list).then(getBy("MaxT"))// assert item is list
    .then(assert((item)=>Array.isArray(item)
    ))// map to temperature
    .then(map(({ start , end , value  })=>({
            start,
            end,
            value: Number(value)
        })
    ))// pick max temperature
    .then(reduce(compareBy((item1, item2)=>item1.value > item2.value
    )))// take only temperature
    .then(({ value  })=>value
    ).unwrap()
;
const getMinTemperature = (list)=>monad(list).then(getBy("MinT"))// assert item is list
    .then(assert((item)=>Array.isArray(item)
    ))// map to temperature
    .then(map(({ start , end , value  })=>({
            start,
            end,
            value: Number(value)
        })
    ))// pick max temperature
    .then(reduce(compareBy((item1, item2)=>item1.value < item2.value
    )))// take only temperature
    .then(({ value  })=>value
    ).unwrap()
;
const getTemperatureDiffPerDay = (list1)=>monad(list1)// take min and max temperature
    .then((list)=>({
            min: getBy("MinT")(list),
            max: getBy("MaxT")(list)
        })
    )// assert is list
    .then(({ min , max  })=>({
            min: assert(Array.isArray)(min),
            max: assert(Array.isArray)(max)
        })
    )// map to min and max per day
    .then(({ min , max  })=>{
        const records = {
        };
        function assign(date, key, value) {
            if (!(date in records)) records[date] = {
            };
            records[date][key] = Number(value);
        }
        min.forEach(({ start , end , value  })=>{
            assign(start.getDate(), "min", value);
            assign(end.getDate(), "min", value);
        });
        max.forEach(({ start , end , value  })=>{
            assign(start.getDate(), "max", value);
            assign(end.getDate(), "max", value);
        });
        return records;
    })// pick only values
    .then(Object.values)// calc by diff
    .then(map(({ min , max  })=>max - min
    ))// pick max
    .then((item)=>Math.max(...item)
    ).unwrap()
;
const getAltitude = getBy("ELEV");
const getPrecipitationPerDay = //
getBy("HOUR_24");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6L0TS"}],"6L0TS":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"jxEug":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TOKEN", ()=>TOKEN
);
parcelHelpers.export(exports, "HOST", ()=>HOST
);
const TOKEN = "CWB-1780875F-D83E-43D4-91B5-A0F0134D3806";
const HOST = "https://opendata.cwb.gov.tw/";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6L0TS"}],"j9quk":[function(require,module,exports) {
var _service = require("./service");
var _utils = require("./utils");
const ALTITUDE_UNIT = 500;
const formatAltitude = (level)=>`${level * ALTITUDE_UNIT}-${(level + 1) * ALTITUDE_UNIT}`
;
const takeByMinTemp = _utils.reduce(_utils.compareBy((item1, item2)=>item1.temp < item2.temp
));
_service.getWeather().then(_utils.map(({ locationName , weatherElement  })=>({
        temp: Number(_utils.getTemperature(weatherElement)),
        altitude: Number(_utils.getAltitude(weatherElement)),
        name: locationName
    })
))// ignore all accident value
.then(_utils.filter((item)=>!_utils.isAccident(item.temp)
))// group by altitude level
.then(_utils.groupBy((item)=>String(Math.floor(item.altitude / ALTITUDE_UNIT))
))// to tuples [key, list]
.then(Object.entries)// get min temp by comp items
.then(_utils.map(//
([key, list])=>[
        key,
        takeByMinTemp(list)
    ]
))// sort by level
.then(_utils.sortBy(([key1], [key2])=>Number(key1) - Number(key2)
))// format key
.then(_utils.map(([key, value])=>[
        formatAltitude(Number(key)),
        value
    ]
))// back to object
.then(Object.fromEntries)// to json string
.then(_utils.toJSON)// render
.then(_utils.tap((result)=>_utils.$("answer-2").innerHTML = result
));

},{"./service":"kCmig","./utils":"jxYDB"}],"fvp6c":[function(require,module,exports) {
var _service = require("./service");
var _utils = require("./utils");
_service.getPrecipitation().then(_utils.map(({ locationName , parameter , weatherElement  })=>({
        name: locationName,
        town: _utils.getTown(parameter),
        city: _utils.getCity(parameter),
        precipitation: Number(_utils.getPrecipitationPerDay(weatherElement))
    })
))// sort by precipitaion
.then(_utils.sortBy((item1, item2)=>item2.precipitation - item1.precipitation
))// take top 20
.then(_utils.take(20))// group by city
.then(_utils.groupBy((item)=>item.city
))// to json string
.then(_utils.toJSON)// render
.then(_utils.tap((result)=>_utils.$("answer-3").innerHTML = result
));

},{"./service":"kCmig","./utils":"jxYDB"}],"adVMZ":[function(require,module,exports) {
var _service = require("./service");
var _utils = require("./utils");
const CITY = "F-D0047-071";
const TOWN = "土城區";
_service.getForecast(CITY)// take only first
.then(_utils.head)// take only location
.then(({ location  })=>location
)// map to item
.then(_utils.map(({ locationName , weatherElement  })=>({
        name: locationName,
        temperature: {
            diff: _utils.getTemperatureDiffPerDay(weatherElement),
            max: _utils.getMaxTemperature(weatherElement),
            min: _utils.getMinTemperature(weatherElement)
        }
    })
))// pick item by location name
.then(_utils.find((item)=>item.name === TOWN
))// pick only temperature
.then(({ temperature  })=>temperature
)// to json string
.then(_utils.toJSON)// render
.then(_utils.tap((result)=>_utils.$("answer-4").innerHTML = result
));

},{"./service":"kCmig","./utils":"jxYDB"}]},["gF9Lx","7PGg5"], "7PGg5", "parcelRequire94c2")

//# sourceMappingURL=index.js.map
