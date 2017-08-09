var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "ionic-angular", "./tour.component"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var ionic_angular_1 = require("ionic-angular");
    var tour_component_1 = require("./tour.component");
    var Tour = (function (_super) {
        __extends(Tour, _super);
        function Tour(app, opts) {
            var _this = _super.call(this, tour_component_1.TourComponent, opts, null) || this;
            _this.app = app;
            _this.isOverlay = true;
            return _this;
        }
        Tour.prototype.present = function (navOptions) {
            if (navOptions === void 0) { navOptions = {}; }
            return this.app.present(this, navOptions, 1);
        };
        Tour.prototype.getTransitionName = function (direction) {
            var key = (direction === 'back' ? 'modalLeave' : 'modalEnter');
            return this._nav && this._nav.config.get(key);
        };
        Tour.prototype.dismissAll = function () {
            this._nav && this._nav.popAll();
        };
        return Tour;
    }(ionic_angular_1.ViewController));
    exports.Tour = Tour;
    var TourController = (function () {
        function TourController(app) {
            this.app = app;
        }
        TourController.prototype.create = function (opts) {
            return new Tour(this.app, opts);
        };
        TourController.decorators = [
            { type: core_1.Injectable },
        ];
        TourController.ctorParameters = function () { return [
            { type: ionic_angular_1.App, },
        ]; };
        return TourController;
    }());
    exports.TourController = TourController;
});
//# sourceMappingURL=tour.js.map