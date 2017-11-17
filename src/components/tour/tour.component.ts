import { Component, ElementRef, Renderer, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  BLOCK_ALL, BlockerDelegate, Config, GestureController, NavParams, Slides, ViewController
} from 'ionic-angular';
import _ from 'lodash';
import { HighlightEvent } from './highlight';
import { Step } from './step';

/**
 * @private
 */
@Component({
  selector: 'tour',
  template: `
    <div class="tour modal-wrapper">
      <div #bd class="tour-bd"></div>
      <ion-slides [effect]="effectSlide" [pager]="true" (ionSlideDidChange)="bindElements()">
        <ion-slide *ngFor="let slide of slides"></ion-slide>
      </ion-slides>
      <div class="center-button" *ngIf="verifyCloseButton()">
        <button ion-button clear class="close" (click)="dismiss('backdrop')">
          <ion-icon name="md-close" class="icon"></ion-icon>
        </button>
      </div>
    </div>
  `,
  host: {
    'role': 'dialog'
  },
  encapsulation: ViewEncapsulation.None,
})
export class TourComponent {

  @ViewChild(Slides) slider: Slides;
  @ViewChild('bd') tourBd: any;
  steps: Array<Step>;
  slides: Array<{ elements: any, loaded: boolean, events: Array<HighlightEvent> }> = [];
  gestureBlocker: BlockerDelegate;
  showCloseOnlyOnLastPage: boolean = false;
  effectSlide: string = 'slide';

  constructor(private viewController: ViewController,
              private elementRef: ElementRef,
              navParams: NavParams,
              config: Config,
              renderer: Renderer,
              gestureCtrl: GestureController) {
    this.steps = navParams.get('steps');

    this.showCloseOnlyOnLastPage = navParams.get('showCloseOnlyOnLastPage');
    this.effectSlide = navParams.get('effectSlide') ? navParams.get('effectSlide') : 'slide';

    this.steps.forEach((step: Step, index) => this.addStep(step, index));

    renderer.setElementClass(elementRef.nativeElement, `loading-${config.get('mode')}`, true);

    this.gestureBlocker = gestureCtrl.createBlocker(BLOCK_ALL);
  }

  ionViewWillEnter() {
    this.gestureBlocker.block();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.tourBd.nativeElement.classList.add('fade-in');
      this.bindElements();
    });
  }

  ionViewDidLeave() {
    this.gestureBlocker.unblock();
  }

  ngOnDestroy() {
    this.gestureBlocker.destroy();
  }

  verifyCloseButton() {
    if (!this.showCloseOnlyOnLastPage) {
      return true;
    }
    let currentIndex = this.slider.getActiveIndex();
    if (currentIndex >= this.slides.length - 1) {
      return true;
    }
    return false;
  }

  private hideShownElements(): Promise<any> {
    return new Promise(resolve => {
      let shownEls = this.elementRef.nativeElement.getElementsByClassName('show');

      [].slice.call(shownEls).forEach((el) => el.classList.remove('show'));

      resolve();
    });
  }

  bindElements() {
    let currentIndex = this.slider.getActiveIndex(),
      promiseChain: Promise<any> = Promise.resolve();

    if (currentIndex < 0 || this.slider.length() < currentIndex + 1) {
      return;
    }

    this.hideShownElements().then(() => {
      if (this.slides[ currentIndex ].hasOwnProperty('events')) {
        this.slides[ currentIndex ].events.forEach((event) => {
          promiseChain = promiseChain.then(() => {
            return event.before(this.slides[ currentIndex ].elements);
          });
        });
      }

      promiseChain
        .then(() => {
          this.appendElements(currentIndex);
        })
        .then(() => {
          if (this.slides[ currentIndex ].hasOwnProperty('events')) {
            this.slides[ currentIndex ].events.forEach((event) => event.after);
          }
        });
    });
  }

  private addStep(step, index) {
    this.slides.push({ elements: [], loaded: false, events: [] });

    step.highlights.forEach((highlight) => {
      highlight.elements().then((element) => {
        this.slides[ index ].elements = _.concat(this.slides[ index ].elements || [], element);

        if (highlight.options.event) {
          this.slides[ index ].events.push(highlight.options.event);
        }
      });
    });
  }

  private appendElements(currentIndex) {
    if (currentIndex) {
      this.hideAppendedElements(currentIndex - 1);
    }
    if (currentIndex < this.slides.length - 1) {
      this.hideAppendedElements(currentIndex + 1);
    }

    this.slides[ currentIndex ].elements.forEach((element) => {
      let appendable = element.clone || element.original;

      if (!this.slides[ currentIndex ].loaded) {
        (<any>this.slider)._slides[ currentIndex ].appendChild(appendable);
      }

      setTimeout(() => {
        element.repositionClone();
        element.respositionOriginalByOffset();

        appendable.classList.add('show');
      });
    });

    this.slides[ currentIndex ].loaded = true;
  }

  private hideAppendedElements(index) {
    this.slides[ index ].elements.forEach((element) => {
      let appendable = element.clone || element.original;
      appendable.classList.remove('show');
    });
  }

  dismiss(role?: string): Promise<any> {
    return this.viewController.dismiss(null, role);
  }
}
