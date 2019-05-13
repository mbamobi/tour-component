import { ElementRef } from '@angular/core';
import { HighlightElement } from './highlight.element';

const elCls = 'highlight';
const elClsPrefix = 'tour-highlight-';
const descriptionClsPrefix = 'tour-description-';

export class Highlight {

  private els: Array<ElementRef>;

  constructor(
    public el?: ElementRef | Array<ElementRef> | any,
    public options?: HighlightOptions
  ) {
    if (el && !Array.isArray(this.el)) {
      this.els = [<ElementRef>el];
    }
  }

  elements(): Promise<Array<HighlightElement | string>> {
    let highlights: Array<HighlightElement> = [],
      description = this.renderDescription();

    if (this.options.repositionDescription) {
      highlights.push(new HighlightElement(description, null, {
        top: this.options.repositionDescription.offsetTop,
        right: this.options.repositionDescription.offsetRight,
        bottom: this.options.repositionDescription.offsetBottom,
        left: this.options.repositionDescription.offsetLeft
      }));
    } else {
      highlights.push(new HighlightElement(description));
    }

    if (this.options.pointerToHighlight) {
      let pointer = document.createElement('div');
      pointer.classList.add(this.options.cls + '-pointer');
      highlights.unshift(new HighlightElement(pointer));
    }

    if (!this.els) {
      return Promise.resolve(highlights);
    }

    return this.els.reduce((sequence: any, el: any) => {
      return sequence.then(() => {
        return new Promise(res => {
          this.cloneElement(el).then((newEl) => {
            highlights.push(new HighlightElement(this.getNativeElement(el), newEl));
            highlights[0].boundingRectRefElements.push(this.getNativeElement(el));
            res();
          });
        });
      });
    }, Promise.resolve()).then(() => Promise.resolve(highlights));
  }

  renderDescription(): HTMLElement {
    let container = document.createElement('div'),
      title = document.createElement('h3'),
      description = document.createElement('span');

    if (this.options.title) {
      title.innerText = this.options.title;
      container.appendChild(title);
    }

    if (this.options.description) {
      description.innerHTML = this.options.description;
      container.appendChild(description);
    }

    container.classList.add('tour-description');
    container.classList.add(descriptionClsPrefix + this.options.cls);

    return container;
  }

  private cloneElement(el): Promise<Node> {
    return new Promise(resolve => {
      let clone = this.getNativeElement(el).cloneNode(true);

      this.defaultCss(this.getNativeElement(el).getBoundingClientRect());

      this.deepCopyComputedStyle(this.getNativeElement(el), clone).then(() => {
        Object.keys(this.options.css).forEach((property) => {
          if (this.options.css[property].indexOf('!important')) {
            clone.style.setProperty(property, this.options.css[property].replace('!important', ''), 'important');
          } else {
            clone.style[property] = this.options.css[property];
          }
        });

        resolve(clone);
      });

      for (let index = 0, max = clone.classList.length; index < max; index++) {
        clone.classList.remove(clone.classList.item(index));
      }

      if (this.options.cls) {
        clone.classList.add(elCls);
        clone.classList.add(elClsPrefix + this.options.cls);
      }
    });
  }

  private defaultCss(clientRect) {
    if (!this.options.hasOwnProperty('css')) {
      this.options.css = {};
    }

    this.options.css['display'] = this.options.css['display'] || 'block';
    this.options.css['position'] = this.options.css['position'] || 'absolute';
    this.options.css['pointer-events'] = this.options.css['pointer-events'] || 'none';
    this.options.css['top'] = this.options.css['top'] || clientRect.top + 'px';
    this.options.css['left'] = this.options.css['left'] || clientRect.left + 'px';
  }

  private deepCopyComputedStyle(elFrom, elTo) {
    let computedStyle = (window.getComputedStyle) ? window.getComputedStyle(elFrom) : elFrom.currentStyle,
      promiseChain: Promise<any> = Promise.resolve();

    Object.keys(computedStyle).forEach((property) => {
      if (this.stylePropertyValid(property, computedStyle[property])) {
        elTo.style[property] = computedStyle[property];
      }
    });

    for (let index = 0; index < elFrom.children.length; index++) {
      promiseChain = promiseChain.then(() => this.deepCopyComputedStyle(elFrom.children.item(index), elTo.children.item(index)));
    }

    return promiseChain;
  }

  private stylePropertyValid(name, value) {
    return typeof value !== 'undefined'
      && typeof value !== 'object'
      && typeof value !== 'function'
      && value.length > 0
      && /\D/.test(name)  // ignorar se `name` for um número
      && name.indexOf('transition') === -1
      && name.indexOf('opacity') === -1
      && (this.options.css && Object.keys(this.options.css).indexOf(name) < 0)
      && value !== parseInt(value, 10);
  }

  private getNativeElement(el) {
    return el.nativeElement || el;
  }

}

export interface HighlightOptions {
  cls?: string;
  title?: string;
  description?: string;
  event?: HighlightEvent;
  css?: { [key: string]: string };
  repositionDescription?: {
    offsetTop?: number,
    offsetRight?: number,
    offsetBottom?: number,
    offsetLeft?: number
  };
  pointerToHighlight?: boolean;
}

export interface HighlightEvent {
  before?: (...args: any[]) => void;
  scrollTo?: (...args: any[]) => void;
  after?: (...args: any[]) => void;
}
