import { ElementRef } from '@angular/core';
import { HighlightElement } from './highlight.element';
export declare class Highlight {
    el: ElementRef | Array<ElementRef>;
    options: HighlightOptions;
    private els;
    constructor(el?: ElementRef | Array<ElementRef>, options?: HighlightOptions);
    elements(): Promise<Array<HighlightElement | string>>;
    renderDescription(): HTMLElement;
    private cloneElement(el);
    private defaultCss(clientRect);
    private deepCopyComputedStyle(elFrom, elTo);
    private stylePropertyValid(name, value);
}
export interface HighlightOptions {
    cls?: string;
    title?: string;
    description?: string;
    event?: HighlightEvent;
    css?: {
        [key: string]: string;
    };
    repositionDescription?: {
        offsetTop?: number;
        offsetRight?: number;
        offsetBottom?: number;
        offsetLeft?: number;
    };
    pointerToHighlight?: boolean;
}
export interface HighlightEvent {
    before?: (...args: any[]) => void;
    scrollTo?: (...args: any[]) => void;
    after?: (...args: any[]) => void;
}
