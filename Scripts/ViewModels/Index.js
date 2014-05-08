(function () {

    require(["bootstrapper"], function (bootstapper) { //load bootstrapper
        require(["jquery"], function ($) {              //if ok, load jquery
            require(["ViewModels/IndexScript"]);            //if ok. load IndexScript
            $(function () {                             //register button clicks after DOM ready.
                $('#projSearch, #northProducts, #TAPCTO, #Dynamic').click(function (event) { //load scripts on-demand on button click
                    event.preventDefault();
                    if (event.target.id === "projSearch")
                        require(["ViewModels/PTSQuickSearch"]);
                    else if (event.target.id === "northProducts")
                        require(["ViewModels/NorthwindSupplierProducts"]);
                    else if (event.target.id === "TAPCTO")
                        require(["ViewModels/TAPCTO"]);
                    else if (event.target.id === "Dynamic")
                        require(["ViewModels/DynamicTable"]);
                });
            });
        });
    });
})();
