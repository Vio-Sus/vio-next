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

/***/ "(api)/./src/pages/api/auth/[...nextauth].ts":
/*!*********************************************!*\
  !*** ./src/pages/api/auth/[...nextauth].ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authOptions\": () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst authOptions = {\n    // Configure one or more authentication providers\n    session: {\n        strategy: \"jwt\"\n    },\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({\n            // The name to display on the sign in form (e.g. \"Sign in with...\")\n            name: \"Credentials\",\n            // `credentials` is used to generate a form on the sign in page.\n            // You can specify which fields should be submitted, by adding keys to the `credentials` object.\n            // e.g. domain, username, password, 2FA token, etc.\n            // You can pass any HTML attribute to the <input> tag through the object.\n            credentials: {\n                username: {\n                    label: \"Username\",\n                    type: \"text\",\n                    placeholder: \"jsmith\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials, req) {\n                // Add logic here to look up the user from the credentials supplied\n                const { username , password  } = credentials;\n                const res = await fetch(\"http://localhost:3000/auth/login\", {\n                    method: \"POST\",\n                    headers: {\n                        \"Content-Type\": \"application/json\"\n                    },\n                    body: JSON.stringify({\n                        username,\n                        password\n                    })\n                });\n                const user = await res.json();\n                if (user) {\n                    // Any user object returned here will be saved in the JSON Web Token\n                    return user;\n                }\n                console.log(\"USERRRR\", user);\n                return null;\n            }\n        })\n    ],\n    pages: {\n        signIn: \"../../SignIn\"\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBcUQ7QUFDWTtBQUcxRCxNQUFNRSxjQUE4QjtJQUN6QyxpREFBaUQ7SUFDakRDLFNBQVM7UUFDUEMsVUFBVTtJQUNaO0lBQ0FDLFdBQVc7UUFDVkosc0VBQW1CQSxDQUFDO1lBQ25CLG1FQUFtRTtZQUNuRUssTUFBTTtZQUNOLGdFQUFnRTtZQUNoRSxnR0FBZ0c7WUFDaEcsbURBQW1EO1lBQ25ELHlFQUF5RTtZQUN6RUMsYUFBYTtnQkFDWEMsVUFBVTtvQkFBRUMsT0FBTztvQkFBWUMsTUFBTTtvQkFBUUMsYUFBYTtnQkFBUztnQkFDbkVDLFVBQVU7b0JBQUVILE9BQU87b0JBQVlDLE1BQU07Z0JBQVc7WUFDbEQ7WUFDQSxNQUFNRyxXQUFVTixXQUFXLEVBQUVPLEdBQUcsRUFBRTtnQkFDaEMsbUVBQW1FO2dCQUNqRSxNQUFNLEVBQUNOLFNBQVEsRUFBRUksU0FBUSxFQUFDLEdBQUdMO2dCQUM3QixNQUFNUSxNQUFNLE1BQU1DLE1BQU0sb0NBQW9DO29CQUN4REMsUUFBUTtvQkFDUkMsU0FBUzt3QkFDTCxnQkFBZ0I7b0JBQ3BCO29CQUNBQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7d0JBQUNiO3dCQUFVSTtvQkFBUTtnQkFDNUM7Z0JBQ0EsTUFBTVUsT0FBTyxNQUFNUCxJQUFJUSxJQUFJO2dCQUMzQixJQUFJRCxNQUFNO29CQUNOLG9FQUFvRTtvQkFDcEUsT0FBT0E7Z0JBQ1gsQ0FBQztnQkFDREUsUUFBUUMsR0FBRyxDQUFDLFdBQVdIO2dCQUN2QixPQUFPLElBQUk7WUFDZjtRQUNGO0tBQ0M7SUFDREksT0FBTztRQUNMQyxRQUFRO0lBQ1Y7QUFFRixFQUFDO0FBR0QsaUVBQWUzQixnREFBUUEsQ0FBQ0UsWUFBWUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Zpby1uZXh0Ly4vc3JjL3BhZ2VzL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0udHM/NTBhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGgsIHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiXG5cblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOk5leHRBdXRoT3B0aW9ucyA9IHtcbiAgLy8gQ29uZmlndXJlIG9uZSBvciBtb3JlIGF1dGhlbnRpY2F0aW9uIHByb3ZpZGVyc1xuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgLy8gVGhlIG5hbWUgdG8gZGlzcGxheSBvbiB0aGUgc2lnbiBpbiBmb3JtIChlLmcuIFwiU2lnbiBpbiB3aXRoLi4uXCIpXG4gICAgbmFtZTogXCJDcmVkZW50aWFsc1wiLFxuICAgIC8vIGBjcmVkZW50aWFsc2AgaXMgdXNlZCB0byBnZW5lcmF0ZSBhIGZvcm0gb24gdGhlIHNpZ24gaW4gcGFnZS5cbiAgICAvLyBZb3UgY2FuIHNwZWNpZnkgd2hpY2ggZmllbGRzIHNob3VsZCBiZSBzdWJtaXR0ZWQsIGJ5IGFkZGluZyBrZXlzIHRvIHRoZSBgY3JlZGVudGlhbHNgIG9iamVjdC5cbiAgICAvLyBlLmcuIGRvbWFpbiwgdXNlcm5hbWUsIHBhc3N3b3JkLCAyRkEgdG9rZW4sIGV0Yy5cbiAgICAvLyBZb3UgY2FuIHBhc3MgYW55IEhUTUwgYXR0cmlidXRlIHRvIHRoZSA8aW5wdXQ+IHRhZyB0aHJvdWdoIHRoZSBvYmplY3QuXG4gICAgY3JlZGVudGlhbHM6IHtcbiAgICAgIHVzZXJuYW1lOiB7IGxhYmVsOiBcIlVzZXJuYW1lXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJqc21pdGhcIiB9LFxuICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH1cbiAgICB9LFxuICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscywgcmVxKSB7XG4gICAgICAvLyBBZGQgbG9naWMgaGVyZSB0byBsb29rIHVwIHRoZSB1c2VyIGZyb20gdGhlIGNyZWRlbnRpYWxzIHN1cHBsaWVkXG4gICAgICAgIGNvbnN0IHt1c2VybmFtZSwgcGFzc3dvcmR9ID0gY3JlZGVudGlhbHMgYXMge3VzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmd9XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgvbG9naW5cIiwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHt1c2VybmFtZSwgcGFzc3dvcmR9KVxuICAgICAgICB9KVxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcmVzLmpzb24oKVxuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgLy8gQW55IHVzZXIgb2JqZWN0IHJldHVybmVkIGhlcmUgd2lsbCBiZSBzYXZlZCBpbiB0aGUgSlNPTiBXZWIgVG9rZW5cbiAgICAgICAgICAgIHJldHVybiB1c2VyXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJVU0VSUlJSXCIsIHVzZXIpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9KVxuICBdLFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogXCIuLi8uLi9TaWduSW5cIlxuICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aChhdXRoT3B0aW9ucykiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiYXV0aE9wdGlvbnMiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJ1c2VybmFtZSIsImxhYmVsIiwidHlwZSIsInBsYWNlaG9sZGVyIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJyZXEiLCJyZXMiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXIiLCJqc29uIiwiY29uc29sZSIsImxvZyIsInBhZ2VzIiwic2lnbkluIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/auth/[...nextauth].ts\n");

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