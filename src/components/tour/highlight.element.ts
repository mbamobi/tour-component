
export class HighlightElement {

  original: HTMLElement;
  public clone: Node;
  public offset: BoundingRectangle;
  boundingRectRefElements: Array<Node> = [];

  constructor(original: HTMLElement, clone?: Node, offset?: BoundingRectangle) {
    this.original = original;
    this.clone = clone;
    this.offset = offset;
  }

  repositionClone(): boolean {
    if (!this.clone) { return false; }

    setTimeout(() => {
      (<HTMLElement>this.clone).style.setProperty('top', this.original.getBoundingClientRect().top + 'px', 'important');
    });

    return true;
  }

  respositionOriginalByOffset() {
    if (!this.offset || !this.original) { return; }

    let highlightBoundingRect = this.highlightBoundingRect();

    if (this.offset.top !== undefined) {
      this.original.style[ 'top' ] = highlightBoundingRect.bottom + this.offset.top + 'px';
    } else if (this.offset.bottom !== undefined) {
      this.original.style['top'] = highlightBoundingRect.top - this.offset.bottom - this.original.scrollHeight + 'px';
    }

    if (this.offset.left !== undefined) {
      this.original.style['left'] = highlightBoundingRect.right + this.offset.left + 'px';
    } else if (this.offset.right !== undefined) {
      this.original.style['left'] = highlightBoundingRect.left - this.offset.right + 'px';
    }
  }

  private highlightBoundingRect(): BoundingRectangle {
    let boundingRect: BoundingRectangle = { top: 0, right: 0, bottom: 0, left: 0 };

    this.boundingRectRefElements.forEach((element) => {
      let elementBoundingRect = (<HTMLElement>element).getBoundingClientRect();

      boundingRect = {
        top: elementBoundingRect.top > boundingRect.top ? elementBoundingRect.top : boundingRect.top,
        right: elementBoundingRect.right > boundingRect.right ? elementBoundingRect.right : boundingRect.right,
        bottom: elementBoundingRect.bottom > boundingRect.bottom ? elementBoundingRect.bottom : boundingRect.bottom,
        left: elementBoundingRect.left > boundingRect.left ? elementBoundingRect.left : boundingRect.left
      };

    });

    return boundingRect;
  }

}

export interface BoundingRectangle {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
