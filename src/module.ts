import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TourController } from './components/tour/tour';
import { TourComponent } from './components/tour/tour.component';

@NgModule({
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
})
export class TourComponentModule {
}
