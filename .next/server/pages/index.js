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
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./src/components/import/CsvUploader.tsx":
/*!***********************************************!*\
  !*** ./src/components/import/CsvUploader.tsx ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! papaparse */ \"papaparse\");\n/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);\naxios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nfunction CSVUploader() {\n    const [file, setFile] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const handleFileChange = (event)=>{\n        const selectedFile = event.target.files?.[0];\n        if (selectedFile) {\n            // setFile(selectedFile);\n            papaparse__WEBPACK_IMPORTED_MODULE_3___default().parse(selectedFile, {\n                header: true,\n                skipEmptyLines: true,\n                complete: function(results) {\n                    setFile(results.data);\n                // console.log(results.data);\n                }\n            });\n        }\n    };\n    const handleSubmit = async (event)=>{\n        event.preventDefault();\n        if (!file) {\n            return;\n        }\n        try {\n            // console.log(file)\n            const response = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/api/csv\", file);\n            console.log(response.data);\n        } catch (error) {\n            console.error(error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n        onSubmit: handleSubmit,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"file\",\n                onChange: handleFileChange,\n                accept: \".csv\"\n            }, void 0, false, {\n                fileName: \"/Users/sohrabradmehr/Documents/GitHub/vio-next/src/components/import/CsvUploader.tsx\",\n                lineNumber: 41,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                type: \"submit\",\n                children: \"Upload\"\n            }, void 0, false, {\n                fileName: \"/Users/sohrabradmehr/Documents/GitHub/vio-next/src/components/import/CsvUploader.tsx\",\n                lineNumber: 42,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/sohrabradmehr/Documents/GitHub/vio-next/src/components/import/CsvUploader.tsx\",\n        lineNumber: 40,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CSVUploader);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9pbXBvcnQvQ3N2VXBsb2FkZXIudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNkO0FBQ0c7QUFFN0IsU0FBU0ksY0FBMkI7SUFDbEMsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdMLCtDQUFRQSxDQUFjLElBQUk7SUFFbEQsTUFBTU0sbUJBQW1CLENBQUNDLFFBQStDO1FBQ3ZFLE1BQU1DLGVBQWVELE1BQU1FLE1BQU0sQ0FBQ0MsS0FBSyxFQUFFLENBQUMsRUFBRTtRQUM1QyxJQUFJRixjQUFjO1lBQ2hCLHlCQUF5QjtZQUN6Qk4sc0RBQVUsQ0FBQ00sY0FBYztnQkFDdkJJLFFBQVEsSUFBSTtnQkFDWkMsZ0JBQWdCLElBQUk7Z0JBQ3BCQyxVQUFVLFNBQVVDLE9BQVksRUFBRTtvQkFDaENWLFFBQVFVLFFBQVFDLElBQUk7Z0JBQ3BCLDZCQUE2QjtnQkFDL0I7WUFDRjtRQUNGLENBQUM7SUFDSDtJQUVBLE1BQU1DLGVBQWUsT0FBT1YsUUFBMkI7UUFDckRBLE1BQU1XLGNBQWM7UUFFcEIsSUFBSSxDQUFDZCxNQUFNO1lBQ1Q7UUFDRixDQUFDO1FBRUQsSUFBSTtZQUNGLG9CQUFvQjtZQUNwQixNQUFNZSxXQUFXLE1BQU1sQixrREFBVSxDQUFDLFlBQVlHO1lBQzlDaUIsUUFBUUMsR0FBRyxDQUFDSCxTQUFTSCxJQUFJO1FBQzNCLEVBQUUsT0FBT08sT0FBTztZQUNkRixRQUFRRSxLQUFLLENBQUNBO1FBQ2hCO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ0M7UUFBS0MsVUFBVVI7OzBCQUNkLDhEQUFDUztnQkFBTUMsTUFBSztnQkFBT0MsVUFBVXRCO2dCQUFrQnVCLFFBQU87Ozs7OzswQkFDdEQsOERBQUNDO2dCQUFPSCxNQUFLOzBCQUFTOzs7Ozs7Ozs7Ozs7QUFHNUI7QUFFQSxpRUFBZXhCLFdBQVdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aW8tbmV4dC8uL3NyYy9jb21wb25lbnRzL2ltcG9ydC9Dc3ZVcGxvYWRlci50c3g/YmY5YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IFBhcGEgZnJvbSBcInBhcGFwYXJzZVwiO1xuXG5mdW5jdGlvbiBDU1ZVcGxvYWRlcigpOiBKU1guRWxlbWVudCB7XG4gIGNvbnN0IFtmaWxlLCBzZXRGaWxlXSA9IHVzZVN0YXRlPEZpbGUgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBoYW5kbGVGaWxlQ2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkRmlsZSA9IGV2ZW50LnRhcmdldC5maWxlcz8uWzBdO1xuICAgIGlmIChzZWxlY3RlZEZpbGUpIHtcbiAgICAgIC8vIHNldEZpbGUoc2VsZWN0ZWRGaWxlKTtcbiAgICAgIFBhcGEucGFyc2Uoc2VsZWN0ZWRGaWxlLCB7XG4gICAgICAgIGhlYWRlcjogdHJ1ZSxcbiAgICAgICAgc2tpcEVtcHR5TGluZXM6IHRydWUsXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVzdWx0czogYW55KSB7XG4gICAgICAgICAgc2V0RmlsZShyZXN1bHRzLmRhdGEpXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cy5kYXRhKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZXZlbnQ6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gY29uc29sZS5sb2coZmlsZSlcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jc3YnLCBmaWxlKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cbiAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIG9uQ2hhbmdlPXtoYW5kbGVGaWxlQ2hhbmdlfSBhY2NlcHQ9XCIuY3N2XCIgLz5cbiAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlVwbG9hZDwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1NWVXBsb2FkZXI7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsImF4aW9zIiwiUGFwYSIsIkNTVlVwbG9hZGVyIiwiZmlsZSIsInNldEZpbGUiLCJoYW5kbGVGaWxlQ2hhbmdlIiwiZXZlbnQiLCJzZWxlY3RlZEZpbGUiLCJ0YXJnZXQiLCJmaWxlcyIsInBhcnNlIiwiaGVhZGVyIiwic2tpcEVtcHR5TGluZXMiLCJjb21wbGV0ZSIsInJlc3VsdHMiLCJkYXRhIiwiaGFuZGxlU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJyZXNwb25zZSIsInBvc3QiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJmb3JtIiwib25TdWJtaXQiLCJpbnB1dCIsInR5cGUiLCJvbkNoYW5nZSIsImFjY2VwdCIsImJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/import/CsvUploader.tsx\n");

/***/ }),

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home),\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_import_CsvUploader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/import/CsvUploader */ \"./src/components/import/CsvUploader.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_import_CsvUploader__WEBPACK_IMPORTED_MODULE_1__]);\n_components_import_CsvUploader__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nfunction Home() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"bow\"\n            }, void 0, false, {\n                fileName: \"/Users/sohrabradmehr/Documents/GitHub/vio-next/src/pages/index.tsx\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_import_CsvUploader__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/sohrabradmehr/Documents/GitHub/vio-next/src/pages/index.tsx\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\nasync function getServerSideProps() {\n    // const dir = path.join(process.cwd(/), \"/public\")\n    // console.log(jsonArray)\n    return {\n        props: {}\n    };\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXgudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUV5RDtBQUUxQyxTQUFTQyxPQUFPO0lBQzdCLHFCQUNFOzswQkFDRSw4REFBQ0M7MEJBQUc7Ozs7OzswQkFDSiw4REFBQ0Ysc0VBQVdBOzs7Ozs7O0FBSWxCLENBQUM7QUFFTSxlQUFlRyxxQkFBcUI7SUFDekMsbURBQW1EO0lBRW5ELHlCQUF5QjtJQUN6QixPQUFPO1FBQ0xDLE9BQU8sQ0FDUDtJQUNGO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Zpby1uZXh0Ly4vc3JjL3BhZ2VzL2luZGV4LnRzeD8xOWEwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5lQ2hhcnQgZnJvbSBcIkAvY29tcG9uZW50cy9jaGFydC9MaW5lQ2hhcnRcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCBDc3ZVcGxvYWRlciBmcm9tIFwiQC9jb21wb25lbnRzL2ltcG9ydC9Dc3ZVcGxvYWRlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxoMT5ib3c8L2gxPlxuICAgICAgPENzdlVwbG9hZGVyIC8+XG4gICAgICB7LyogPExpbmVDaGFydCAgLz4gKi99XG4gICAgPC8+XG4gICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXJ2ZXJTaWRlUHJvcHMoKSB7XG4gIC8vIGNvbnN0IGRpciA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgvKSwgXCIvcHVibGljXCIpXG4gIFxuICAvLyBjb25zb2xlLmxvZyhqc29uQXJyYXkpXG4gIHJldHVybiB7XG4gICAgcHJvcHM6IHtcbiAgICB9LCAvLyB3aWxsIGJlIHBhc3NlZCB0byB0aGUgcGFnZSBjb21wb25lbnQgYXMgcHJvcHNcbiAgfTtcbn1cbiJdLCJuYW1lcyI6WyJDc3ZVcGxvYWRlciIsIkhvbWUiLCJoMSIsImdldFNlcnZlclNpZGVQcm9wcyIsInByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ }),

/***/ "papaparse":
/*!****************************!*\
  !*** external "papaparse" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("papaparse");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/index.tsx"));
module.exports = __webpack_exports__;

})();