/// <reference path="../_references.js" />

// Initialized the namespace
var KnockoutDemoNamespace = {};

// View model declaration
KnockoutDemoNamespace.initViewModel = function (customer, countries) {
    var customerViewModel = ko.validatedObservable({
        CustomerID: ko.observable(customer.CustomerID),
        FirstName: ko.observable(customer.FirstName).extend({ required: true }),
        LastName: ko.observable(customer.LastName).extend({ required: true }),
        IsMale: ko.observable(customer.IsMale),
        Age: ko.observable(customer.Age).extend({ required: true }).extend({ number: true }),
        CountryID: ko.observable(customer.CountryID).extend({ required: true }),
        CountryOptions: ko.observableArray(countries)
    });

    var validationOptions =
      { insertMessages: true, decorateElement: true, errorElementClass: 'errorFill' };
    ko.validation.init(validationOptions);

    return customerViewModel;
}


// Bind the customer
KnockoutDemoNamespace.bindData = function (customer) {
    // get the country list
    KnockoutDemoNamespace.getCountries();

    // Create the view model
    KnockoutDemoNamespace.viewModel =
      KnockoutDemoNamespace.initViewModel(customer, KnockoutDemoNamespace.countries);
    ko.applyBindings(this.viewModel);
}


KnockoutDemoNamespace.getCountries = function () {
    $.ajax({
        url: "/Country/",
        type: 'post',
        contentType: 'application/json',
        cache: false,
        async: false,
        success: function (result) {
            KnockoutDemoNamespace.countries = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = '';
            $('#message').html(jqXHR.responseText);
        }
    });
}

KnockoutDemoNamespace.getCustomer = function (customerID) {
    $.ajax({
        url: "/KOValidation/Get/",
        type: 'post',
        data: "{'customerID':'1' }",
        contentType: 'application/json',
        cache: false,
        success: function (result) {
            KnockoutDemoNamespace.bindData(result);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = '';
            $('#message').html(jqXHR.responseText);
        }
    });
}

KnockoutDemoNamespace.addCustomer = function () {

    if (KnockoutDemoNamespace.viewModel.isValid()) {
        $.ajax({
            url: "/KOValidation/Add/",
            type: 'post',
            data: ko.toJSON(this),
            contentType: 'application/json',
            success: function (result) {
                $('#message').html(result);
            }
        });
    }
}


$(document).ready(function () {
    KnockoutDemoNamespace.getCustomer(1);

});
