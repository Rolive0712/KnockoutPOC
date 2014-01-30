/// <reference path="../_references.js" /> //should be placed at the top of file. not in between

$(function () { //jquery DOM ready event

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
        $('#tblTAPCTO').tablesorter({
            headers: {
                0: { sorter: "text" },
                1: { sorter: "text" },
                2: { sorter: "text" },
                3: { sorter: "text" },
                4: { sorter: "text" },
                5: { sorter: "text" },
                6: { sorter: "text" }
            }
        });
        /*Approach 2 => KO Binding using observable column properties*/

        function CTO() {                    //observable class properties
            this.projectNumber = ko.observable();
            this.projectName = ko.observable();
            this.lob = ko.observable();
            this.age = ko.observable();
            this.designCharter = ko.observable();
            this.surveyVersion = ko.observable();
            this.phase = ko.observable();

        }

        App.CTOViewModel = {            //Singleton object
            TAPCTOArray: ko.observableArray(),
            GetTAPCTO: function () {
                var self = this;

                $('#TAPCTOTbody').empty(); //clear the tbody of table before ajax request
                self.TAPCTOArray([]);   //reset the array. not required

                /*****************USING MULTIPLE INLINE DEFERRED OBJECTS********************************/
                var deferredTemplates = dataservice.loadClientTemplates("TAPCTOTemplate", "../ClientTemplates/_templates.htm"),
                                    deferredCTO = dataservice.GetPromise({
                                        url: "../Home/CTOGridFill",
                                        type: "GET",
                                        data: null,
                                        async: true

                                    });

                $.when(deferredTemplates, deferredCTO).done(function (data1, CTOArray) {
                    var json = ko.utils.parseJson(CTOArray[2].responseText);
                    $.each(json, function (i, cto) {
                        App.CTOViewModel.TAPCTOArray.push(new CTO() //push data into array mapping to the class properties.
                                    .projectNumber(cto.TPRNbr)
                                    .projectName(cto.PrjNm)
                                    .lob(cto.LOB)
                                    .age(cto.Age)
                                    .designCharter(cto.DC)
                                    .surveyVersion(cto.surveyver)
                                    .phase(cto.Phase)
                                );
                    });

                    $('#tblTAPCTO').trigger("update"); //trigger update on table for jQuery table Sorter to work

                }).fail(function (jqXHR, textStatus, errorThrown) {
                    logger.LogError(errorThrown + ":" + jqXHR.responseText);
                });
            }
        }
        ko.setTemplateEngine(ko.nativeTemplateEngine.instance);
        ko.applyBindings(App.CTOViewModel, $('#TAP_CTO')[0]);
    });

});
