/* eslint-disable */
module.exports = {
name: "@yarnpkg/plugin-workspace-lockfile",
factory: function (require) {
var plugin;plugin =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _yarnpkg_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _yarnpkg_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarnpkg_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarnpkg_cli__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _yarnpkg_cli__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_yarnpkg_cli__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _yarnpkg_fslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _yarnpkg_fslib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_yarnpkg_fslib__WEBPACK_IMPORTED_MODULE_2__);




const createLockfile = async (configuration, {
  cwd
}) => {
  const {
    project,
    workspace
  } = await _yarnpkg_core__WEBPACK_IMPORTED_MODULE_0__.Project.find(configuration, cwd);
  const cache = await _yarnpkg_core__WEBPACK_IMPORTED_MODULE_0__.Cache.find(configuration);
  let requiredWorkspaces = new Set([workspace]); // First we compute the dependency chain to see what workspaces are
  // dependencies of the one we're trying to focus on.
  //
  // Note: remember that new elements can be added in a set even while
  // iterating over it (because they're added at the end)
  // DISABLED:
  // for (const workspace of requiredWorkspaces) {
  //   for (const dependencyType of Manifest.hardDependencies) {
  //     for (const descriptor of workspace.manifest
  //       .getForScope(dependencyType)
  //       .values()) {
  //       const matchingWorkspace = project.tryWorkspaceByDescriptor(descriptor);
  //       if (matchingWorkspace === null) continue;
  //requiredWorkspaces.add(matchingWorkspace);
  //     }
  //   }
  // }
  // remove any workspace that isn't a dependency, iterate in reverse so we can splice it

  for (let i = project.workspaces.length - 1; i >= 0; i--) {
    const currentWorkspace = project.workspaces[i];

    if (!requiredWorkspaces.has(currentWorkspace)) {
      project.workspaces.splice(i, 1);
    }
  }

  await project.resolveEverything({
    cache,
    report: new _yarnpkg_core__WEBPACK_IMPORTED_MODULE_0__.ThrowReport()
  });

  for (const w of project.workspaces) {
    const pkg = Array.from(project.originalPackages.values()).find(p => p.identHash === w.locator.identHash);

    if (pkg === null || pkg === void 0 ? void 0 : pkg.reference.startsWith("workspace:")) {
      // ensure we replace the path in the lockfile from `workspace:packages/somepath` to `workspace:.`
      if (w.cwd === cwd) {
        pkg.reference = `workspace:.`;
        Array.from(project.storedDescriptors.values()).find(v => v.identHash === pkg.identHash).range = `workspace:.`;
      }
    }
  }

  return project.generateLockfile();
};

const green = text => `\x1b[32m${text}\x1b[0m`;

const plugin = {
  hooks: {
    afterAllInstalled: async project => {
      const configuration = await _yarnpkg_core__WEBPACK_IMPORTED_MODULE_0__.Configuration.find(project.cwd, (0,_yarnpkg_cli__WEBPACK_IMPORTED_MODULE_1__.getPluginConfiguration)());
      await _yarnpkg_core__WEBPACK_IMPORTED_MODULE_0__.StreamReport.start({
        configuration,
        stdout: process.stdout,
        includeLogs: true
      }, async report => {
        for (const workspace of project.workspaces) {
          const lockPath = _yarnpkg_fslib__WEBPACK_IMPORTED_MODULE_2__.ppath.join(workspace.cwd, "yarn.lock-workspace");
          await _yarnpkg_fslib__WEBPACK_IMPORTED_MODULE_2__.xfs.writeFilePromise(lockPath, await createLockfile(configuration, workspace));
          report.reportInfo(null, `${green(`✓`)} Wrote ${lockPath}`);
        }
      });
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);

/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("@yarnpkg/core");;

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@yarnpkg/cli");;

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@yarnpkg/fslib");;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })()
;
return plugin;
}
};