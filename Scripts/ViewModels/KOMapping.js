/// <reference path="../_references.js" />              for intellisense

$(function () {
    var dependencies = [
        "knockout",
        "komapping",
        "ViewModels/DataService",
        "ViewModels/Logger"
    ];

    var App = App || {};

    requirejs(dependencies, function (ko, komapping, dataservice, logger) {

        // the line below is very important for komapping library to work
        // only then "ko.mapping.fromJS" works on the button click for ko mapping test
        ko.mapping = komapping;

        App.vm1 = function () {
            var self = this;

            self.FirstName = ko.observable("");
            self.LastName = ko.observable("");
            self.PhoneNumber = ko.observable("");
            self.SOEID = ko.observable("");
            self.GEID = ko.observable("");
            self.LOB = ko.observable("");
            self.Email = ko.observable("");

            self.BindByObservables = function () {
                $.when(dataservice.GetPromise({
                    url: "../KOUtils/GetTAPPersonInfoBySOEID",
                    type: "POST",
                    data: "{'soeid':'RR53665'}", // if data is specified, then provide 
                    async: true
                })).done(function (tapPersonInfo) {

                    var personInfo = tapPersonInfo[0];
                    self.FirstName(personInfo.FirstNm);
                    self.LastName(personInfo.LastNm);
                    self.PhoneNumber(personInfo.PhoneNbr);
                    self.SOEID(personInfo.SOEID);
                    self.GEID(personInfo.GEID);
                    self.LOB(personInfo.LOB);
                    self.Email(personInfo.EMail);

                }).fail(function (jqXHR, textStatus, errorThrown) {
                    logger.LogError(errorThrown + ":" + jqXHR.responseText);
                });
            };
        };

        ko.setTemplateEngine(ko.nativeTemplateEngine.instance);
        ko.applyBindings(new App.vm1(), $('#KOObservableBind')[0]);

        /*
        1. In VM2, none of the properties are set as "observable"
        2. Uses "ko.mapping.fromJS" function to map source object properties with the target element.
        3. Good practise since code is concise.
        4. Ensure the target's data-bind attribute name is same as source object's property name
        */

        $('#btnKOMapping').click(function (event) { // todo=> register button click KO way. could not find so used jQuery way for this viewmodel
            event.preventDefault();

            $.when(dataservice.GetPromise({
                url: "../KOUtils/GetTAPPersonInfoBySOEID",
                type: "POST",
                data: "{'soeid':'RR53665'}", // if data is specified, then only "POST" type works. "GET" does not work.
                async: true
            })).done(function (tapPersonInfo) {

                var personInfo = tapPersonInfo[0];
                App.vm2 = ko.mapping.fromJS(personInfo);

                //do some basic mapping (without mapping plugin)

                /*function Item(id, firstName, lastName, expertise, img, tag) {
                this.id = ko.observable(id);
                this.firstName = ko.observable(firstName);
                ....
                ...
                this.fullName = ko.dependentObservable(function () {
                return this.firstName() + " " + this.lastName();
                }, this);
                ...
                this.imgPath = ko.dependentObservable(function () {
                ...
                }, this);
                }
                vm2 = ko.utils.arrayMap(personInfo, function (item) {
                return new Item(item.id, item.firstName, item.lastName, item.expertise, item.img, item.tag);
                });*/

                ko.applyBindings(App.vm2, $('#KOMappingBind')[0]);

            }).fail(function (jqXHR, textStatus, errorThrown) {
                dataservice.displayMessage(errorThrown + ":" + jqXHR.responseText, "ERROR");
            });
        });

    });
});
