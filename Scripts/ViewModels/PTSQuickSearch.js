/// <reference path="../_references.js" /> //should be placed at the top of file. not in between

/*
1. PTS quick search javascript viewmodel code is part of the same index.cshtml page
2. once too many functions are added, the ViewModel would become very large and cumbersome to debug and fix issues.
3. to eliminate that, I have added the javascript code for quick search in this new js file.
4. But doing so we again have to apply the KO bindings.
5. we cannot have multiple KO bindings for the same page (since this js file will render in the same page).
6. to eliminate I have added separate sections for each Knockout views in the Index.cshtml file.
7. Section "PersonInfoSection" is added for the Person table in index.cshtml page
8. Section "PTSQuickSearchSection" is added for the PTS quick search table tab in the same page.
    
9. Finally to apply bindings, apply KO bindings to each section passing in the binding context and section node as shown under.
        
Ex:
ko.applyBindings(new ViewModel(), $('#PersonInfoSection')[0]);
ko.applyBindings(new quickSearchViewModel(), $('#PTSQuickSearchSection')[0]);
*/

$(function () { //jquery DOM ready event
    var dependencies = [
        "knockout",
        "Lib/jquery.tablesorter.min",
        "ViewModels/DataService",
        "ViewModels/Logger",
        "Lib/jquery.smallipop",
    ];

    var App = App || {};

    requirejs(dependencies, function (ko, sorter, dataservice, logger, smallipopup) {

        //Initialise table sorter plugin
        $('#tblProjectList').tablesorter(
            {
                headers: {
                    0: { sorter: "text" },
                    1: { sorter: "text" },
                    2: { sorter: "text" }
                }
            });

        App.quickSearchViewModel = function () {
            var self = this;
            self.projectListArray = ko.observableArray([]);
            self.GetPTSProjectList = function () {
                var PTSProject = {
                    proj_id: $('#txtProjectId').val(),
                    proj_name: $('#txtProjectName').val(),
                    proj_mgr: $('#txtProjectMgr').val()
                };

                $('#projListTbody').empty(); //clear the tbody of table before ajax request
                var startDate = new Date();

                /*****************USING MULTIPLE INLINE DEFERRED OBJECTS********************************/

                /*
                1. EXECUTE BOTH DEFERRED PROMISES IN PARALLEL
                2. This deferred will only resolve when both requests have completed.
                3. With this approach, we have single failure callback for both deferred promises.
                */
                var deferredTemplates = dataservice.loadClientTemplates("koProjListTemplate", "../ClientTemplates/_templates.htm"),
                        deferredPTSProjList = dataservice.GetPromise({
                            url: "../Home/GetPTSProjectList",
                            type: "POST",
                            data: JSON.stringify(PTSProject),
                            async: true
                        });
                var deferredPromises = [deferredTemplates, deferredPTSProjList];

                $.when.apply($, deferredPromises).done(function (data1, projects) { //call with promise array
                    //var projects = $.parseJSON(projects[2].responseText); //jQuery way
                    var projects = ko.utils.parseJson(projects[2].responseText); // KO way
                    self.projectListArray(projects);
                    var endDate = new Date();
                    var diff = (endDate.getTime() - startDate.getTime()) / 1000;
                    logger.LogTimeDuration("Took " + diff + " secs to load " + projects.length + " records", "TIME");

                    $('#tblProjectList').trigger("update"); //trigger update on table for jQuery table Sorter to work correctly

                }).fail(function (jqXHR, textStatus, errorThrown) {
                    logger.LogError(errorThrown + ":" + jqXHR.responseText, "ERROR");
                });
            };

            self.ShowPopUp = function (data, event) {
                //debugger;
                var message = "Project ID: " + data.proj_id + "\n Project Manager: " + data.proj_mgr + "\n Project Name: " + data.proj_name;
                //$('#aProjId').smallipop({}, message);
                $('#aProjId').attr('title', message);
                $('#aProjId').smallipop({
                    theme: 'black',
                    popupDistance: 0,
                    popupYOffset: -14,
                    popupAnimationSpeed: 100
                });
            };
        };

        ko.setTemplateEngine(ko.nativeTemplateEngine.instance);
        ko.applyBindings(new App.quickSearchViewModel(), $('#PTSQuickSearchSection')[0]);

        $('#smallipopStatic').smallipop({}, 'hi dude');

    });

});
