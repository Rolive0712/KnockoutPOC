(function () { // SEAF => self invoking anonymous function
    "use strict"; //allows strong typing in javascript

    $(function () { //jquery DOM ready event
        var dependencies = [
            "knockout",
            "Lib/jquery.tablesorter.min",
            "ViewModels/DataService",
            "ViewModels/Logger",
            "datatable",
            "datatableplugin",
            "koDatatables"
        ];

        var App = App || {};

        requirejs(dependencies, function (ko, sorter, dataservice, logger, datatable, plugin, kodatatables) {

            //Initialise table sorter plugin
            $('#tblProjectList').tablesorter(
            {
                headers: {
                    0: { sorter: "text" },
                    1: { sorter: "text" },
                    2: { sorter: "text" }
                }
            });

            App.dynamicVM = function () {
                var self = this;
                self.dynamicArray = ko.observableArray([]);
                self.columnNames = ko.computed(function () {
                    if (self.dynamicArray().length === 0)
                        return [];
                    var props = [];
                    var obj = self.dynamicArray()[0];
                    for (var name in obj)
                        props.push(name);
                    return props;
                });

                self.BindDynamic = function () {
                    $('#tbodyDynamic').empty(); //clear the tbody of table before ajax request

                    $('#searchLoadingIcon').show();
                    var startDate = new Date(),
                        deferred = dataservice.GetPromise({
                            url: URL.BindDynamicTable,
                            type: "POST",
                            data: null,
                            async: true
                        }),
                        defer = $.when(deferred);

                    defer.done(function (data) { //call with promise array
                        var array = ko.utils.parseJson(data),
                                    endDate = new Date(),
                                    diff = (endDate.getTime() - startDate.getTime()) / 1000;

                        self.dynamicArray(array);
                        $('#searchLoadingIcon').hide();
                        logger.LogTimeDuration("Took " + diff + " secs to load " + array.length + " records", "TIME");
                        //$('#tblDynamic').trigger("update"); //trigger update on table for jQuery table Sorter to work correctly.

                        var oTableActive = $('#tblDynamic').dataTable();
                        $('#tblDynamic').dataTable({
                            "bProcessing": true,
                            "bLengthChange": false,
                            "bInfo": false,
                            "bDestroy": true,
                            "bSort": true,
                            "bFilter": true,
                            "bAutoWidth": true,
                            "bDeferRender": true
                        });
                        oTableActive.fnDraw();


                    }).fail(function (jqXHR, textStatus, errorThrown) { // single failure callback for multiple AJAX requests done in parallel
                        logger.LogError(errorThrown + ":" + jqXHR.responseText, "ERROR");
                    });
                };
            };

            ko.setTemplateEngine(ko.nativeTemplateEngine.instance);
            ko.applyBindings(new App.dynamicVM(), $('#dynamic')[0]);

        });

    });
})();

