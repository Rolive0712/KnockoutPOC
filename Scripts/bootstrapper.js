/*

The below File structure Maintained for RequireJS module loading technique.
      
/Scripts/bootstrapper.js            -- main first file to load with requireJS
      
/Scripts/Lib/jquery-2.0.3.js        -- all 3rd party libraries go in the Lib folder
/Scripts/Lib/knockout-3.0.0.js
/Scripts/Lib/.....
/Scripts/Lib/....
/Scripts/Lib/.....
/Scripts/Lib/....
/Scripts/Lib/.....
/Scripts/Lib/....

/Scripts/ViewModels/PTSQuickSearch.js   -- all application specific scripts go in the ViewModels folder
/Scripts/ViewModels/TAPCTO.js
/Scripts/ViewModels/NorthwindSupplierProducts.js
/Scripts/ViewModels/IndexScript.js


*/

(function () {
    //shim is required if knockout.mapping is used since it has knockout dependency
    //shim is required if underscore or amplify or komapping plugin is used and they are not AMD ready
    //Knockout parent library is AMD ready so no need to shim it.

    requirejs.config({
        baseUrl: '/Scripts/',
        waitSeconds: 60, //wait for 60 seconds to load file. else quit (default is 7)
        paths: {
            "jquery": "Lib/jquery-2.0.3.min",
            "knockout": "Lib/knockout-3.0.0.debug",
            "komapping": "lib/knockout.mapping"
        },
        shim: {
            komapping: {
                deps: ['knockout'],
                exports: 'komapping'
            }
        }
    });
})();


/*require.config({
//appDir: "some/path/",
baseUrl: ".",
waitSeconds: 200,
enforceDefine: true,
mainConfigFile: 'init.js',
paths: {
jquery: 'libs/jquery-1.8.3.min',
backbone: 'libs/backbone.0.9.9',
underscore: 'libs/underscore-1.4.3',
json2: 'libs/json2',
jquerymobile: 'libs/jquery.mobile-1.2.0.min'
},
packages: [],
shim: {
jquery: {
exports: 'jQuery'
},
komapping: {
deps: ['knockout'],
exports: 'komapping'
},
kovalidation: {
deps: ['knockout'],
exports: 'kovalidation'
},
jquerymobile: {
deps: ['jquery'],
exports: 'jQuery.mobile'
},
underscore: {
exports: '_'
},
backbone: {
deps: ['jquerymobile', 'jquery', 'underscore'],
exports: 'Backbone'
}
},
keepBuildDir: true,
locale: "en-us",
optimize: "closure",
skipDirOptimize: false,
generateSourceMaps: false,
normalizeDirDefines: "skip",
uglify: {
toplevel: true,
ascii_only: true,
beautify: true,
max_line_length: 1000,
defines: {
DEBUG: ['name', 'false']
},


no_mangle: true
},
uglify2: {},
closure: {
CompilerOptions: {},
CompilationLevel: 'SIMPLE_OPTIMIZATIONS',
loggingLevel: 'WARNING'
},
cssImportIgnore: null,
inlineText: true,
useStrict: false,
pragmas: {
fooExclude: true
},
pragmasOnSave: {
//Just an example
excludeCoffeeScript: true
},
has: {
'function-bind': true,
'string-trim': false
},
hasOnSave: {
'function-bind': true,
'string-trim': false
},
//namespace: 'foo',
skipPragmas: false,
skipModuleInsertion: false,
optimizeAllPluginResources: false,
findNestedDependencies: false,
removeCombined: false,
name: "init",
out: "main-built.js",
wrap: {
start: "(function() {",
end: "}());"
},
preserveLicenseComments: true,
logLevel: 0,
cjsTranslate: true,
useSourceUrl: true
})*/
