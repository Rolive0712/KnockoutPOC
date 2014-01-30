/// <reference path="../_references.js" />

// Class to represent a row in the seat reservations grid
$(document).ready(function () {

    var SeatReservation = function (name, initialMeal) {
        var self = this;
        self.name = name;
        self.meal = ko.observable(initialMeal);
        self.formattedPrice = ko.computed(function () {
            var price = self.meal().price;
            return price ? "$" + price.toFixed(2) : "None";
        });
    };

    // Overall viewmodel for this screen, along with initial state

    var ReservationsViewModel = function () {
        var self = this;

        self.availableMeals = [
            { mealName: "Vegetarian Raw Meal", price: 10.52 },
            { mealName: "Vegetarian Vegan Meal", price: 34.95 },
            { mealName: "Fruit Platter Meal", price: 45.50 },
            { mealName: "Burger", price: 5.50 },
            { mealName: "Sandwich", price: 15.50 },
            { mealName: "Bread", price: 7.50 },
            { mealName: "Butter", price: 5.50 },
            { mealName: "veggies", price: 45.50 },
            { mealName: "Fruits and nut", price: 45.50 },
            { mealName: "Snacks", price: 45.50 }
        ];

        // Editable data - seats Array
        self.seats = ko.observableArray([
            new SeatReservation("Sampath", self.availableMeals[0]),
            new SeatReservation("Lokuge", self.availableMeals[1])
        ]);

        // Computed Total amount
        self.totalAmount = ko.computed(function () {
            var total = 0;
            for (var i = 0; i < self.seats().length; i++)
                total += self.seats()[i].meal().price;
            return total;
        });

        // add seats
        self.addSeat = function () {
            self.seats.push(new SeatReservation("Chaminda", self.availableMeals[2]));
        };

        // remove seats
        self.removeSeat = function (seat) { self.seats.remove(seat); };

    };

    ko.applyBindings(new ReservationsViewModel(), $('#reservation')[0]);


    var KOTEST = function () {
        var self = this;
        self.personArray = ko.observableArray([
                                            { firstname: 'roshit', lastname: 'rajan', address: 'ADD1', Amount: 45 },
                                            { firstname: 'jack', lastname: 'nichols', address: 'ADD2', Amount: 75.24 },
                                            { firstname: 'robin', lastname: 'sam', address: 'ADD3', Amount: 45.675 },
                                            { firstname: 'Ryan', lastname: 'Philip', address: 'ADD4', Amount: 78.23 },
                                            { firstname: 'Sam', lastname: 'nichols', address: 'ADD5', Amount: 45.32 },
                                            { firstname: 'Don', lastname: 'Bradman', address: 'ADD6', Amount: 74.52 }
                                        ]);

        self.AddPerson = function () {
            self.personArray.push({ firstname: 'fnDynamic', lastname: 'lnDynamic', address: 'addDynamic', Amount: 254.23 });
        };

        // KO compute calculates the sum dynamically if any rows are deleted.
        self.TotalAmount = ko.computed(function () {

            /*
                In below line "()" after personArray is very important.
                if "()" is not used , the length is always 0.
            */
            var total = 0.0, arrPerson = self.personArray();
            for (var i = 0; i < arrPerson.length; i++) {
                total += arrPerson[i].Amount;
            }
            return total.toFixed(2);
        });

        self.DeletePerson = function (person) {
            if (window.confirm("Do u want to delete ? " + person.firstname + " " + person.lastname)) {
                self.personArray.remove(person);
            }
        };
    };

    ko.applyBindings(new KOTEST(), $('#Test')[0]);

});
