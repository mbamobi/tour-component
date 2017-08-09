import { HighlightElement } from './highlight.element';
var elCls = 'highlight';
var elClsPrefix = 'tour-highlight-';
var descriptionClsPrefix = 'tour-description-';
var Highlight = (function () {
    function Highlight(el, options) {
        this.el = el;
        this.options = options;
        if (el && !Array.isArray(this.el)) {
            this.els = [el];
        }
    }
    Highlight.prototype.elements = function () {
        var _this = this;
        var highlights = [], description = this.renderDescription();
        if (this.options.repositionDescription) {
            highlights.push(new HighlightElement(description, null, {
                top: this.options.repositionDescription.offsetTop,
                right: this.options.repositionDescription.offsetRight,
                bottom: this.options.repositionDescription.offsetBottom,
                left: this.options.repositionDescription.offsetLeft
            }));
        }
        else {
            highlights.push(new HighlightElement(description));
        }
        if (!this.els) {
            return Promise.resolve(highlights);
        }
        return this.els.reduce(function (sequence, el) {
            return sequence.then(function () {
                return new Promise(function (res) {
                    _this.cloneElement(el).then(function (newEl) {
                        highlights.push(new HighlightElement(el.nativeElement, newEl));
                        highlights[0].boundingRectRefElements.push(el.nativeElement);
                        res();
                    });
                });
            });
        }, Promise.resolve()).then(function () { return Promise.resolve(highlights); });
    };
    Highlight.prototype.renderDescription = function () {
        var container = document.createElement('div'), title = document.createElement('h3'), description = document.createElement('span');
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
    };
    Highlight.prototype.cloneElement = function (el) {
        var _this = this;
        return new Promise(function (resolve) {
            var clone = el.nativeElement.cloneNode(true);
            _this.defaultCss(el.nativeElement.getBoundingClientRect());
            _this.deepCopyComputedStyle(el.nativeElement, clone).then(function () {
                Object.keys(_this.options.css).forEach(function (property) {
                    if (_this.options.css[property].indexOf('!important')) {
                        clone.style.setProperty(property, _this.options.css[property].replace('!important', ''), 'important');
                    }
                    else {
                        clone.style[property] = _this.options.css[property];
                    }
                });
                resolve(clone);
            });
            for (var index = 0, max = clone.classList.length; index < max; index++) {
                clone.classList.remove(clone.classList.item(index));
            }
            if (_this.options.cls) {
                clone.classList.add(elCls);
                clone.classList.add(elClsPrefix + _this.options.cls);
            }
        });
    };
    Highlight.prototype.defaultCss = function (clientRect) {
        if (!this.options.hasOwnProperty('css')) {
            this.options.css = {};
        }
        this.options.css['display'] = this.options.css['display'] || 'block';
        this.options.css['position'] = this.options.css['position'] || 'absolute';
        this.options.css['pointer-events'] = this.options.css['pointer-events'] || 'none';
        this.options.css['top'] = this.options.css['top'] || clientRect.top + 'px';
        this.options.css['left'] = this.options.css['left'] || clientRect.left + 'px';
    };
    Highlight.prototype.deepCopyComputedStyle = function (elFrom, elTo) {
        var _this = this;
        var computedStyle = (window.getComputedStyle) ? window.getComputedStyle(elFrom) : elFrom.currentStyle, promiseChain = Promise.resolve();
        Object.keys(computedStyle).forEach(function (property) {
            if (_this.stylePropertyValid(property, computedStyle[property])) {
                elTo.style[property] = computedStyle[property];
            }
        });
        var _loop_1 = function (index) {
            promiseChain = promiseChain.then(function () { return _this.deepCopyComputedStyle(elFrom.children.item(index), elTo.children.item(index)); });
        };
        for (var index = 0; index < elFrom.children.length; index++) {
            _loop_1(index);
        }
        return promiseChain;
    };
    Highlight.prototype.stylePropertyValid = function (name, value) {
        return typeof value !== 'undefined'
            && typeof value !== 'object'
            && typeof value !== 'function'
            && value.length > 0
            && name.indexOf('transition') === -1
            && name.indexOf('opacity') === -1
            && (this.options.css && Object.keys(this.options.css).indexOf(name) < 0)
            && value !== parseInt(value, 10);
    };
    return Highlight;
}());
export { Highlight };
//# sourceMappingURL=highlight.js.map