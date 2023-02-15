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
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "(api)/./server/db/client.ts":
/*!*****************************!*\
  !*** ./server/db/client.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"prisma\": () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (false) {}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zZXJ2ZXIvZGIvY2xpZW50LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQU92QyxNQUFNQyxTQUFTQyxPQUFPRCxNQUFNLElBQUksSUFBSUQsd0RBQVlBLENBQ25EO0lBQ0lHLEtBQUs7UUFBQztLQUFRO0FBQ2xCLEdBQ0Y7QUFFRixJQUFJQyxLQUFxQyxFQUFFRixFQUF1QkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aW8tbmV4dC8uL3NlcnZlci9kYi9jbGllbnQudHM/N2IyNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIHZhciBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZDtcbiAgICB9XG5cblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbC5wcmlzbWEgfHwgbmV3IFByaXNtYUNsaWVudChcbiAgICB7XG4gICAgICAgIGxvZzogW1wicXVlcnlcIl0sXG4gICAgfVxuKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIikgZ2xvYmFsLnByaXNtYSA9IHByaXNtYTsiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiZ2xvYmFsIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./server/db/client.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/auth/[...nextauth].ts":
/*!*********************************************!*\
  !*** ./src/pages/api/auth/[...nextauth].ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authOptions\": () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _server_db_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../server/db/client */ \"(api)/./server/db/client.ts\");\n\n\n\nconst authOptions = {\n    // Configure one or more authentication providers\n    secret: process.env.AUTH_SECRET,\n    session: {\n        maxAge: 30 * 24 * 60 * 60\n    },\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({\n            // The name to display on the sign in form (e.g. \"Sign in with...\")\n            name: \"Credentials\",\n            // `credentials` is used to generate a form on the sign in page.\n            // You can specify which fields should be submitted, by adding keys to the `credentials` object.\n            // e.g. domain, username, password, 2FA token, etc.\n            // You can pass any HTML attribute to the <input> tag through the object.\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"text\",\n                    placeholder: \"murad@gmail.com\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials, req) {\n                // Add logic here to look up the user from the credentials supplied\n                // const {username, password} = credentials as {username: string, password: string}\n                console.log(\"credentials\", credentials);\n                const user = await _server_db_client__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                    where: {\n                        email: credentials?.email\n                    }\n                });\n                if (user) {\n                    // Any user object returned here will be saved in the JSON Web Token\n                    return user;\n                }\n                console.log(\"USERRRR\", user);\n                return null;\n            }\n        })\n    ],\n    pages: {\n        signIn: \"../../SignIn\"\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXFEO0FBQ1k7QUFDZDtBQUc1QyxNQUFNRyxjQUE4QjtJQUN6QyxpREFBaUQ7SUFDakRDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVztJQUMvQkMsU0FBUztRQUNQQyxRQUFRLEtBQUssS0FBSyxLQUFLO0lBQ3pCO0lBQ0FDLFdBQVc7UUFDVlQsc0VBQW1CQSxDQUFDO1lBQ25CLG1FQUFtRTtZQUNuRVUsTUFBTTtZQUNOLGdFQUFnRTtZQUNoRSxnR0FBZ0c7WUFDaEcsbURBQW1EO1lBQ25ELHlFQUF5RTtZQUN6RUMsYUFBYTtnQkFDWEMsT0FBTztvQkFBRUMsT0FBTztvQkFBU0MsTUFBTTtvQkFBUUMsYUFBYTtnQkFBa0I7Z0JBQ3RFQyxVQUFVO29CQUFFSCxPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUcsV0FBVU4sV0FBVyxFQUFFTyxHQUFHLEVBQUU7Z0JBQ2hDLG1FQUFtRTtnQkFDakUsbUZBQW1GO2dCQUVuRkMsUUFBUUMsR0FBRyxDQUFDLGVBQWVUO2dCQUVuQyxNQUFNVSxPQUFPLE1BQU1wQixxRUFBc0IsQ0FBQztvQkFDeENzQixPQUFPO3dCQUNMWCxPQUFPRCxhQUFhQztvQkFDdEI7Z0JBQ0Y7Z0JBSVEsSUFBSVMsTUFBTTtvQkFDTixvRUFBb0U7b0JBQ3BFLE9BQU9BO2dCQUNYLENBQUM7Z0JBRURGLFFBQVFDLEdBQUcsQ0FBQyxXQUFXQztnQkFDdkIsT0FBTyxJQUFJO1lBQ2I7UUFHSjtLQUNDO0lBQ0RHLE9BQU87UUFDTEMsUUFBUTtJQUNWO0FBRUYsRUFBQztBQUdELGlFQUFlMUIsZ0RBQVFBLENBQUNHLFlBQVlBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aW8tbmV4dC8uL3NyYy9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzPzUwYTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoLCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIlxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIlxuaW1wb3J0IHtwcmlzbWF9IGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2ZXIvZGIvY2xpZW50XCJcblxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6TmV4dEF1dGhPcHRpb25zID0ge1xuICAvLyBDb25maWd1cmUgb25lIG9yIG1vcmUgYXV0aGVudGljYXRpb24gcHJvdmlkZXJzXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuQVVUSF9TRUNSRVQsXG4gIHNlc3Npb246IHtcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzLVxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgIC8vIFRoZSBuYW1lIHRvIGRpc3BsYXkgb24gdGhlIHNpZ24gaW4gZm9ybSAoZS5nLiBcIlNpZ24gaW4gd2l0aC4uLlwiKVxuICAgIG5hbWU6IFwiQ3JlZGVudGlhbHNcIixcbiAgICAvLyBgY3JlZGVudGlhbHNgIGlzIHVzZWQgdG8gZ2VuZXJhdGUgYSBmb3JtIG9uIHRoZSBzaWduIGluIHBhZ2UuXG4gICAgLy8gWW91IGNhbiBzcGVjaWZ5IHdoaWNoIGZpZWxkcyBzaG91bGQgYmUgc3VibWl0dGVkLCBieSBhZGRpbmcga2V5cyB0byB0aGUgYGNyZWRlbnRpYWxzYCBvYmplY3QuXG4gICAgLy8gZS5nLiBkb21haW4sIHVzZXJuYW1lLCBwYXNzd29yZCwgMkZBIHRva2VuLCBldGMuXG4gICAgLy8gWW91IGNhbiBwYXNzIGFueSBIVE1MIGF0dHJpYnV0ZSB0byB0aGUgPGlucHV0PiB0YWcgdGhyb3VnaCB0aGUgb2JqZWN0LlxuICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwibXVyYWRAZ21haWwuY29tXCIgfSxcbiAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XG4gICAgfSxcbiAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMsIHJlcSkge1xuICAgICAgLy8gQWRkIGxvZ2ljIGhlcmUgdG8gbG9vayB1cCB0aGUgdXNlciBmcm9tIHRoZSBjcmVkZW50aWFscyBzdXBwbGllZFxuICAgICAgICAvLyBjb25zdCB7dXNlcm5hbWUsIHBhc3N3b3JkfSA9IGNyZWRlbnRpYWxzIGFzIHt1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3JlZGVudGlhbHNcIiwgY3JlZGVudGlhbHMpXG4gICAgICAgIFxuY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICB3aGVyZToge1xuICAgIGVtYWlsOiBjcmVkZW50aWFscz8uZW1haWwsXG4gIH0sXG59KVxuXG4gICAgICAgIFxuXG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAvLyBBbnkgdXNlciBvYmplY3QgcmV0dXJuZWQgaGVyZSB3aWxsIGJlIHNhdmVkIGluIHRoZSBKU09OIFdlYiBUb2tlblxuICAgICAgICAgICAgcmV0dXJuIHVzZXJcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCJVU0VSUlJSXCIsIHVzZXIpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG5cblxuICB9KVxuICBdLFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogXCIuLi8uLi9TaWduSW5cIlxuICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aChhdXRoT3B0aW9ucykiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwicHJpc21hIiwiYXV0aE9wdGlvbnMiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiQVVUSF9TRUNSRVQiLCJzZXNzaW9uIiwibWF4QWdlIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwicmVxIiwiY29uc29sZSIsImxvZyIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJwYWdlcyIsInNpZ25JbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/auth/[...nextauth].ts"));
module.exports = __webpack_exports__;

})();