(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "ionic-angular", "./components/tour/tour", "./components/tour/tour.component"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var ionic_angular_1 = require("ionic-angular");
    var tour_1 = require("./components/tour/tour");
    var tour_component_1 = require("./components/tour/tour.component");
    var TourComponentModule = (function () {
        function TourComponentModule() {
        }
        TourComponentModule.decorators = [
            { type: core_1.NgModule, args: [{
                        declarations: [
                            tour_component_1.TourComponent
                        ],
                        imports: [
                            ionic_angular_1.IonicPageModule.forChild(tour_component_1.TourComponent),
                        ],
                        providers: [
                            tour_1.TourController
                        ],
                        exports: [
                            tour_component_1.TourComponent
                        ]
                    },] },
        ];
        TourComponentModule.ctorParameters = function () { return []; };
        return TourComponentModule;
    }());
    exports.TourComponentModule = TourComponentModule;
});
//# sourceMappingURL=module.js.map