(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./module", "./components/tour/tour", "./components/tour/step", "./components/tour/highlight", "./components/tour/highlight.element"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var module_1 = require("./module");
    exports.TourComponentModule = module_1.TourComponentModule;
    var tour_1 = require("./components/tour/tour");
    exports.TourController = tour_1.TourController;
    exports.Tour = tour_1.Tour;
    var step_1 = require("./components/tour/step");
    exports.Step = step_1.Step;
    var highlight_1 = require("./components/tour/highlight");
    exports.Highlight = highlight_1.Highlight;
    var highlight_element_1 = require("./components/tour/highlight.element");
    exports.HighlightElement = highlight_element_1.HighlightElement;
});
//# sourceMappingURL=index.js.map