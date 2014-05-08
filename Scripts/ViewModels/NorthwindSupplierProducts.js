/// <reference path="../_references.js" />              for intellisense

(function () {
    "use strict";

    $(function () {
        var dependencies = [
        "jquery",
        "knockout",
        "Lib/jquery.tablesorter.min",
        "ViewModels/DataService",
        "ViewModels/Logger"
    ];

        var App = App || {};

        requirejs(dependencies, function ($, ko, sorter, dataservice, logger) {

            //Initialise table sorter plugin

            $('#tblSuppliers').tablesorter({
                headers: {
                    0: { sorter: "text" },
                    1: { sorter: "text" },
                    2: { sorter: "text" },
                    3: { sorter: "text" },
                    4: { sorter: "text" },
                    5: { sorter: "text" },
                    6: { sorter: "text" },
                    7: { sorter: "text" }
                }
            });

            //Initialise table sorter plugin
            $('#tblProductsForSupplier').tablesorter({
                headers: {
                    0: { sorter: "text" },
                    1: { sorter: "text" },
                    2: { sorter: "text" },
                    3: { sorter: "text" },
                    4: { sorter: "text" },
                    5: { sorter: "text" },
                    6: { sorter: "text" },
                    7: { sorter: "text" },
                    8: { sorter: "text" },
                    9: { sorter: "text" }
                }
            });

            App.productsSupplierVm = function () {

                var self = this;
                self.ProductList = ko.observableArray([]);
                self.SupplierList = ko.observableArray([]);

                self.GetProductsForSupplier = function () {

                    var params = {
                        supplierId: $('#txtSupplierId').val()
                    };

                    var url = URL.UrlSchemeAndAuthority + URL.ClientTemplate2,
                        deferredTemplates = dataservice.loadClientTemplates("", url, "ALL"),
                        deferredProdSupp = dataservice.GetPromise({
                            url: URL.GetProductSupplierListFromNorthwind,
                            type: "POST",
                            data: JSON.stringify(params),
                            async: true
                        }),
                        deferredPromises = [deferredTemplates, deferredProdSupp],
                        defer = $.when.apply($, deferredPromises);

                    defer.done(function (data1, prodSuppData) {
                        var list = ko.utils.parseJson(prodSuppData[2].responseText);    //KO way
                        self.ProductList(list.productList);
                        self.SupplierList(list.supplierList);
                            //$('#tblSuppliers').trigger("update"); //not required here since we get one supplier only
                        $('#suppProductTbody').trigger("update"); //trigger update on table for jQuery table Sorter to work

                    }).fail(function (jqXHR, textStatus, errorThrown) { // single failure callback for multiple AJAX requests done in parallel
                        if (jqXHR.status === 500) {
                            if (typeof (jqXHR.responseText) === "string") {
                                var json = ko.utils.parseJson(jqXHR.responseText);
                                logger.LogError(errorThrown + ":" + json.message);
                                $('#searchLoadingIcon').hide();
                            }
                            else {
                                logger.LogError(errorThrown + ":" + jqXHR.responseText);
                                $('#searchLoadingIcon').hide();
                            }
                        }
                        else {
                            logger.LogError(errorThrown + ":" + jqXHR.responseText);
                            $('#searchLoadingIcon').hide();
                        }
                    });
                }
            };

            ko.setTemplateEngine(ko.nativeTemplateEngine.instance);
            ko.applyBindings(new App.productsSupplierVm(), $('#NorthwindSupplierProducts')[0]);
        });
    });
})();

