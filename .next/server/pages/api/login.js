"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/login";
exports.ids = ["pages/api/login"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "(api)/./server/db/client.ts":
/*!*****************************!*\
  !*** ./server/db/client.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"prisma\": () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (false) {}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zZXJ2ZXIvZGIvY2xpZW50LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQU92QyxNQUFNQyxTQUFTQyxPQUFPRCxNQUFNLElBQUksSUFBSUQsd0RBQVlBLENBQ25EO0lBQ0lHLEtBQUs7UUFBQztLQUFRO0FBQ2xCLEdBQ0Y7QUFFRixJQUFJQyxLQUFxQyxFQUFFRixFQUF1QkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aW8tbmV4dC8uL3NlcnZlci9kYi9jbGllbnQudHM/N2IyNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIHZhciBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZDtcbiAgICB9XG5cblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbC5wcmlzbWEgfHwgbmV3IFByaXNtYUNsaWVudChcbiAgICB7XG4gICAgICAgIGxvZzogW1wicXVlcnlcIl0sXG4gICAgfVxuKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIikgZ2xvYmFsLnByaXNtYSA9IHByaXNtYTsiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiZ2xvYmFsIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./server/db/client.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/login.ts":
/*!********************************!*\
  !*** ./src/pages/api/login.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _server_db_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../server/db/client */ \"(api)/./server/db/client.ts\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n\n\nasync function handler(req, res) {\n    let { method  } = req;\n    switch(method){\n        case \"POST\":\n            try {\n                const { email , password  } = req.body;\n                console.log(\"req.body\", req.body);\n                const userCheck = await _server_db_client__WEBPACK_IMPORTED_MODULE_0__.prisma.user.findUnique({\n                    where: {\n                        email: email\n                    }\n                });\n                let passwordCheck;\n                if (userCheck && userCheck.password) {\n                    passwordCheck = await bcrypt__WEBPACK_IMPORTED_MODULE_1___default().compare(password, userCheck.password);\n                }\n                console.log(\"Valid Password: \", passwordCheck);\n                console.log(\"userCheck\", userCheck);\n                if (passwordCheck) {\n                    res.status(200).json({\n                        userCheck\n                    });\n                    return;\n                } else {\n                    res.status(400).json({\n                        success: false,\n                        error: \"Invalid Password\"\n                    });\n                    return;\n                }\n            } catch (error) {\n                console.log(error);\n                res.status(400).json({\n                    success: false,\n                    error: error\n                });\n            }\n            break;\n        default:\n            res.status(400).json({\n                success: false\n            });\n            break;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2xvZ2luLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBZ0Q7QUFDcEI7QUFHYixlQUFlRSxRQUFRQyxHQUFRLEVBQUVDLEdBQVEsRUFBRTtJQUN6RCxJQUFJLEVBQUNDLE9BQU0sRUFBQyxHQUFHRjtJQUNaLE9BQVFFO1FBQ0osS0FBSztZQUNELElBQUk7Z0JBQ0EsTUFBTSxFQUFDQyxNQUFLLEVBQUVDLFNBQVEsRUFBQyxHQUFHSixJQUFJSyxJQUFJO2dCQUNsQ0MsUUFBUUMsR0FBRyxDQUFDLFlBQVlQLElBQUlLLElBQUk7Z0JBRWhDLE1BQU1HLFlBQVksTUFBTVgscUVBQXNCLENBQUM7b0JBQzNDYyxPQUFPO3dCQUNIUixPQUFPQTtvQkFDWDtnQkFDSjtnQkFFQSxJQUFJUztnQkFDSixJQUFJSixhQUFhQSxVQUFVSixRQUFRLEVBQUU7b0JBQ2pDUSxnQkFBaUIsTUFBTWQscURBQWMsQ0FBQ00sVUFBVUksVUFBVUosUUFBUTtnQkFDdEUsQ0FBQztnQkFDREUsUUFBUUMsR0FBRyxDQUFDLG9CQUFvQks7Z0JBRWhDTixRQUFRQyxHQUFHLENBQUMsYUFBYUM7Z0JBRXpCLElBQUlJLGVBQWU7b0JBQ2ZYLElBQUlhLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7d0JBQUVQO29CQUFVO29CQUNqQztnQkFDSixPQUFPO29CQUNIUCxJQUFJYSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO3dCQUFDQyxTQUFTLEtBQUs7d0JBQUVDLE9BQU87b0JBQWtCO29CQUMvRDtnQkFDSixDQUFDO1lBR0wsRUFBRSxPQUFPQSxPQUFPO2dCQUNaWCxRQUFRQyxHQUFHLENBQUNVO2dCQUNaaEIsSUFBSWEsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztvQkFBQ0MsU0FBUyxLQUFLO29CQUFFQyxPQUFPQTtnQkFBSztZQUN0RDtZQUNBLEtBQU07UUFDVjtZQUNJaEIsSUFBSWEsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBQ0MsU0FBUyxLQUFLO1lBQUE7WUFDcEMsS0FBTTtJQUVsQjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aW8tbmV4dC8uL3NyYy9wYWdlcy9hcGkvbG9naW4udHM/ZGE5YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3ByaXNtYX0gZnJvbSBcIi4uLy4uLy4uL3NlcnZlci9kYi9jbGllbnRcIlxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCJcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiBsZXQge21ldGhvZH0gPSByZXFcbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICBjYXNlIFwiUE9TVFwiOlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7ZW1haWwsIHBhc3N3b3JkfSA9IHJlcS5ib2R5XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXEuYm9keVwiLCByZXEuYm9keSlcblxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJDaGVjayA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgbGV0IHBhc3N3b3JkQ2hlY2s7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJDaGVjayAmJiB1c2VyQ2hlY2sucGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRDaGVjayAgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdXNlckNoZWNrLnBhc3N3b3JkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbGlkIFBhc3N3b3JkOiBcIiwgcGFzc3dvcmRDaGVjaylcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlckNoZWNrXCIsIHVzZXJDaGVjaylcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAocGFzc3dvcmRDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHVzZXJDaGVjayB9KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkludmFsaWQgUGFzc3dvcmRcIn0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICBcbn1cbn0iXSwibmFtZXMiOlsicHJpc21hIiwiYmNyeXB0IiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsImVtYWlsIiwicGFzc3dvcmQiLCJib2R5IiwiY29uc29sZSIsImxvZyIsInVzZXJDaGVjayIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJwYXNzd29yZENoZWNrIiwiY29tcGFyZSIsInN0YXR1cyIsImpzb24iLCJzdWNjZXNzIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/login.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/login.ts"));
module.exports = __webpack_exports__;

})();