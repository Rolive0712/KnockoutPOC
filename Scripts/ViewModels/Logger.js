(function () {
    var App = App || {};

    define(['Lib/toastr.min'], function (toastr) {

        App.ToastLogger = function () {
            var self = this;

            self.LogSuccess = function (message) {
                toastr.success(message, "Success Notification");
            };

            self.LogError = function (message) {
                toastr.error(message, "!Error Notification");
            };

            self.LogWarning = function (message) {
                toastr.warning(message);
            };

            self.LogInformation = function (message) {
                toastr.info(message);
            };

            self.LogTimeDuration = function (message) {
                toastr.info(message);
            };

            toastr.options = {
                "closeButton": true,
                "debug": false,
                "positionClass": "toast-top-right",
                "onclick": null,
                "showDuration": "200",
                "hideDuration": "200",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
        };

        return new App.ToastLogger();
    });
})();
