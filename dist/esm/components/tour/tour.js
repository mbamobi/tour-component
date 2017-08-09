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
import { Injectable } from '@angular/core';
import { App, ViewController } from 'ionic-angular';
import { TourComponent } from './tour.component';
var Tour = (function (_super) {
    __extends(Tour, _super);
    function Tour(app, opts) {
        var _this = _super.call(this, TourComponent, opts, null) || this;
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
}(ViewController));
export { Tour };
var TourController = (function () {
    function TourController(app) {
        this.app = app;
    }
    TourController.prototype.create = function (opts) {
        return new Tour(this.app, opts);
    };
    TourController.decorators = [
        { type: Injectable },
    ];
    TourController.ctorParameters = function () { return [
        { type: App, },
    ]; };
    return TourController;
}());
export { TourController };
//# sourceMappingURL=tour.js.map