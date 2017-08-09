import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TourController } from './components/tour/tour';
import { TourComponent } from './components/tour/tour.component';
var TourComponentModule = (function () {
    function TourComponentModule() {
    }
    TourComponentModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        TourComponent
                    ],
                    imports: [
                        IonicPageModule.forChild(TourComponent),
                    ],
                    providers: [
                        TourController
                    ],
                    exports: [
                        TourComponent
                    ]
                },] },
    ];
    TourComponentModule.ctorParameters = function () { return []; };
    return TourComponentModule;
}());
export { TourComponentModule };
//# sourceMappingURL=module.js.map