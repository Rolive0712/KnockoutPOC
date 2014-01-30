/// <reference path="../_references.js" /> //should be placed at the top of file. not in between
(function () {  //self invoke
    var App = App || {};
    define(['jquery', 'ViewModels/Logger'], function ($, logger) { //provide module id "common" to reference in other modules
        //'use strict';
        App.CommonViewModel = function () {
            var self = this;
            self.tempArray = [''];
            self.IsBlankOrUndefined = function (templateId) {
                return templateId != undefined && templateId != "";
            };

            self.GetPromise = function (options) {
                return $.ajax({
                    url: options.url,
                    //                beforeSend: function () { $('#loadingIcon').show(); },
                    //                complete: function () { $('#loadingIcon').hide(); },
                    type: options.type,
                    cache: options.cache || false,  // if options.cache is available then set it or else set to "false"
                    data: options.data || null,     // if options.data is available then set it or else set to "true"
                    async: options.async || true,   // if options.async is available then set it or else set to "true"
                    contentType: options.contentType || "application/json"
                });
            };

            self.loadClientTemplates = function (templateId, templateURL, loadAll) {

                if ($.inArray(templateId, self.tempArray) == -1 || loadAll === "ALL") {  //check if templates are already loaded in memory
                    return $.when(this.GetPromise({
                        url: templateURL,
                        type: "GET",
                        data: null,
                        async: true
                    })).done(function (alltemplates) {
                        if ((self.IsBlankOrUndefined(templateId)) && (loadAll == undefined)) {  //if template id specified, then iterate to filter and then append
                            $(alltemplates).filter("script").each(function (i, el) {
                                if (el.id === templateId) {

                                    $('body').append(el.outerHTML);
                                    self.tempArray.push(templateId);

                                    logger.LogInformation(templateId + " loaded first time");
                                    return false;
                                }
                            });
                        }
                        else {
                            $('body').append(alltemplates); //if template id not specified, then append all data
                        }
                    });
                }
            };
        };
        return new App.CommonViewModel(); //return as new to get type as "Object" in calling module.
    });
})();
