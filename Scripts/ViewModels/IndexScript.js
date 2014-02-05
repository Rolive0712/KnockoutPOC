/// <reference path="../_references.js" />              for intellisense



(function () {
    "use strict"; //allows strong typing in javascript
    $(function () { //after dom ready, load scripts asynchronously
        var dependencies = [
            "Lib/jquery-ui-1.10.3.min",
            "knockout",
            "ViewModels/DataService",
            "ViewModels/Logger"
        ];

        var App = App || {};

        requirejs(dependencies, function (ui, ko, dataservice, logger) {
            $('#tabs').tabs();
            App.ViewModel = function () {
                var self = this;
                //1. KO computed example: Any change in the num1 or num2 computes the sum using KO compute
                //2. No need to attach any event handlers like "onblur" to recalculate.

                self.NUM1 = ko.observable("1");
                self.NUM2 = ko.observable("2");
                self.ComputedSUM = ko.computed(function () {
                    return parseInt(self.NUM1()) + parseInt(self.NUM2());
                });

                self.firstName = ko.observable("Roshit");           //static hard coded text
                self.lastName = ko.observable("Rajan");             //static hard coded text
                self.personInfoArray = ko.observableArray([]);      //set default blank array => used for binding data from server.

                self.GetPersons = function () {
                    $('#koTbody').empty();                          // clear the table tbody before binding
                    //USING MULTIPLE INLINE DEFERRED OBJECTS
                    var deferredTemplates = dataservice.loadClientTemplates("koPersonTemplate", "../ClientTemplates/_templates.htm"),
                                    deferredPersons = dataservice.GetPromise({
                                        url: "../Home/GetPersons",
                                        type: "GET",
                                        data: null,
                                        async: true
                                    });

                    $.when(deferredTemplates, deferredPersons).done(function (data1, personData) {

                        var json = ko.utils.parseJson(personData[2].responseText);
                        self.personInfoArray(json);
                        $('#loadingIcon').hide();
                        logger.LogSuccess("data loaded");

                    }).fail(function (jqXHR, textStatus, errorThrown) { // async failure
                        logger.LogError(errorThrown + ":" + jqXHR.responseText);
                    });
                };
            };

            ko.setTemplateEngine(ko.nativeTemplateEngine.instance);     // to speed up rendering. to check timings
            ko.applyBindings(new App.ViewModel(), $('#PersonInfoSection')[0]);
        });

    });
})();

function TestRequireJSObjects($, ui, ko, AJAX) {
    console.log("Test output");
    console.log("$: " + typeof ($));
    console.log("ko: " + typeof (ko));
    console.log("common: " + typeof (AJAX));
    console.log("jquery downloaded confirm: " + $.trim("Roshit   "));
}

//show loading icon to any ajax start or stop within any page

/*$(document).ajaxStart(function () {
$('#loadingIcon').show();
}).ajaxStop(function () {
$('#loadingIcon').hide();
});*/
