"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Midday = // Cache all the switchable headers (different colors)
// Scroll Cache
// Tools
function Midday(element, options) {
  var _this = this;

  _classCallCheck(this, Midday);

  _defineProperty(this, "options", {
    // The class that wraps each header. Used as a clipping mask.
    headerClass: 'middayHeader',
    // The class that wraps the contents of each header. Also used as a clipping mask.
    innerClass: 'middayInner',
    // The class used by the default header (useful when adding multiple headers with different markup).
    defaultClass: 'default',
    // Unused: Add a prefix to the header classes (so if you set the "thingy-" prefix, a section with data-midday="butterfly" will use the "thingy-butterfly" header)
    classPrefix: '',
    // If you want to use plugin more than once or if you want a different data attribute name (so if you set the "header" in a section use data-header)
    sectionSelector: 'midday' // Cache element

  });

  _defineProperty(this, "element", null);

  _defineProperty(this, "_headers", {});

  _defineProperty(this, "_headerInfo", {
    top: 0,
    height: 0 // Cache all the sections which cause the header to change colors

  });

  _defineProperty(this, "_$sections", []);

  _defineProperty(this, "_sections", []);

  _defineProperty(this, "_scrollTop", 0);

  _defineProperty(this, "_documentHeight", 0);

  _defineProperty(this, "_transformMode", false);

  _defineProperty(this, "refresh", function () {
    _this._headerInfo = {
      // Todo: Add support for top (though it's mostly unnecessary)
      top: 0,
      height: _this.element.outerHeight
    }; // Sections that affect the color of the header (and cache)

    _this._$sections = (0, _filter2["default"])(document.querySelectorAll('[data-' + _this.options.sectionSelector + ']'), _util.visible);
    _this._sections = [];

    _this._setupHeaders(); //this.recalculate();

  });

  _defineProperty(this, "recalculate", function () {
    this._recalculateSections();

    this._updateHeaderHeight();

    this._recalculateHeaders();

    this._updateHeaders();
  });

  _defineProperty(this, "_recalculateHeaders", function () {
    // Check classes are currently active in the header (including the current percentage of each)
    this._scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop; // Some browsers (e.g on OS X) allow scrolling past the top/bottom.

    this._scrollTop = Math.max(this._scrollTop, 0);
    this._scrollTop = Math.min(this._scrollTop, this._documentHeight); // Get the header's position relative to the document (given that it's fixed)

    var headerHeight = this._headerInfo.height;
    var headerStart = this._scrollTop + this._headerInfo.top;
    var headerEnd = headerStart + headerHeight; // Add support for transforms (for plugins like Headroom or general css stuff)

    if (typeof window.getComputedStyle === 'function') {
      //var style = window.getComputedStyle(this.element[0], null);
      var style = window.getComputedStyle(this.element, null);
      var styleTop = style.top;
      var top = 0.0;
      var transformY = 0.0;

      if (this._transformMode !== false && typeof style.transform === 'string') {
        // Convert the transform matrix to an array
        var transformArray = style.transform.match(/(-?[0-9\.]+)/g);

        if (transformArray !== null && transformArray.length >= 6 && !isNaN(parseFloat(transformArray[5]))) {
          transformY = parseFloat(transformArray[5]);
        }
      }

      if (style.top.indexOf('%') >= 0 && !isNaN(parseFloat(styleTop))) {
        // SAFARI ISSUE https://bugs.webkit.org/show_bug.cgi?id=29084
        top = window.innerHeight * (parseFloat(styleTop) / 100);
      } else if (styleTop.indexOf('px') >= 0 && !isNaN(parseFloat(styleTop))) {
        top = parseFloat(style.top);
      }

      headerStart += top + transformY;
      headerEnd += top + transformY;
    } // Reset the header status


    for (var headerClass in this._headers) {
      if (!this._headers.hasOwnProperty(headerClass)) {
        continue;
      } // from == '' signals that the section is inactive


      this._headers[headerClass].from = '';
      this._headers[headerClass].progress = 0.0;
    } // Set the header status


    for (var ix = 0; ix < this._sections.length; ix++) {
      // Todo: This isn't exactly the best code.
      // If there's some kind of overlap between the header and a section, that class becomes active
      if (headerEnd >= this._sections[ix].start && headerStart <= this._sections[ix].end) {
        this._headers[this._sections[ix].className].visible = true; // If the header sits neatly within the section, this is the only active class

        if (headerStart >= this._sections[ix].start && headerEnd <= this._sections[ix].end) {
          this._headers[this._sections[ix].className].from = 'top';
          this._headers[this._sections[ix].className].progress += 1.0;
        } // If the header is in the middle of the end of a section, it comes from the top
        else if (headerEnd > this._sections[ix].end && headerStart < this._sections[ix].end) {
            this._headers[this._sections[ix].className].from = 'top';
            this._headers[this._sections[ix].className].progress = 1.0 - (headerEnd - this._sections[ix].end) / headerHeight;
          } // If the header is in the middle of the start of a section, it comes from the bottom
          else if (headerEnd > this._sections[ix].start && headerStart < this._sections[ix].start) {
              // If the same color continues in the next section, just add the progress to it so we don't switch
              if (this._headers[this._sections[ix].className].from === 'top') {
                this._headers[this._sections[ix].className].progress += (headerEnd - this._sections[ix].start) / headerHeight;
              } else {
                this._headers[this._sections[ix].className].from = 'bottom';
                this._headers[this._sections[ix].className].progress = (headerEnd - this._sections[ix].start) / headerHeight;
              }
            }
      }
    }
  });

  _defineProperty(this, "_updateHeaders", function () {
    // Don't do anything if there are no headers
    if (typeof this._headers[this.options['defaultClass']] === 'undefined') {
      return;
    } // Do some preprocessing to ensure a header is always shown (even if some this._sections haven't been assigned)


    var totalProgress = 0.0;
    var lastActiveClass = '';

    for (var headerClass in this._headers) {
      if (!this._headers.hasOwnProperty(headerClass)) {
        continue;
      }

      if (!this._headers[headerClass].from === '') {
        continue;
      }

      totalProgress += this._headers[headerClass].progress;
      lastActiveClass = headerClass;
    }

    if (totalProgress < 1.0) {
      // Complete the header at the bottom with the default class
      if (this._headers[this.options['defaultClass']].from === '') {
        this._headers[this.options['defaultClass']].from = this._headers[lastActiveClass].from === 'top' ? 'bottom' : 'top';
        this._headers[this.options['defaultClass']].progress = 1.0 - totalProgress;
      } else {
        this._headers[this.options['defaultClass']].progress += 1.0 - totalProgress;
      }
    }

    for (var ix in this._headers) {
      if (!this._headers.hasOwnProperty(ix)) {
        continue;
      }

      if (!this._headers[ix].from === '') {
        continue;
      }

      var offset = (1.0 - this._headers[ix].progress) * 100.0; // Add an extra offset when an area is hidden to prevent clipping/rounding issues.

      if (offset >= 100.0) {
        offset = 110.0;
      }

      if (offset <= -100.0) {
        offset = -110.0;
      }

      if (this._headers[ix].from === 'top') {
        if (this._transformMode !== false) {
          this._headers[ix].element.style[this._transformMode] = 'translateY(-' + offset + '%) translateZ(0)';
          this._headers[ix].inner.style[this._transformMode] = 'translateY(+' + offset + '%) translateZ(0)';
        } else {
          this._headers[ix].element.style['top'] = '-' + offset + '%';
          this._headers[ix].inner.style['top'] = '+' + offset + '%';
        }
      } else {
        if (this._transformMode !== false) {
          this._headers[ix].element.style[this._transformMode] = 'translateY(+' + offset + '%) translateZ(0)';
          this._headers[ix].inner.style[this._transformMode] = 'translateY(-' + offset + '%) translateZ(0)';
        } else {
          this._headers[ix].element.style['top'] = '+' + offset + '%';
          this._headers[ix].inner.style['top'] = '-' + offset + '%';
        }
      }
    }
  });

  _defineProperty(this, "_getSupportedTransform", function () {
    var prefixes = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];

    for (var ix = 0; ix < prefixes.length; ix++) {
      if (document.createElement('div').style[prefixes[ix]] !== undefined) {
        return prefixes[ix];
      }
    }

    return false;
  });

  _defineProperty(this, "_setupHeaders", function () {
    //Get all the different header colors
    var context = this;
    this._headers[this.options['defaultClass']] = {};

    for (var i = 0; i < this._$sections.length; i++) {
      var $section = this._$sections[i];
      var headerClass = $section.dataset[this.options.sectionSelector];

      if (typeof headerClass !== 'string') {
        continue;
      }

      headerClass = headerClass.trim();

      if (headerClass === '') {
        continue;
      }

      context._headers[headerClass] = {};
    } // Get the padding of the original Header. It will be applied to the internal headers.
    // Todo: Implement this


    var defaultPaddings = {
      top: this.element.style.paddingTop,
      right: this.element.style.paddingRight,
      bottom: this.element.style.paddingBottom,
      left: this.element.style.paddingLeft
    }; // Create the fake headers

    Object.assign(this.element.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      overflow: 'hidden'
    });

    this._updateHeaderHeight();

    var $customHeaders = this.element.querySelectorAll('.' + this.options['headerClass']);

    if ($customHeaders.length) {
      if (!this.element.querySelector('.' + this.options['headerClass'] + '.' + this.options['defaultClass'])) {
        // If there's no default header, just pick the first one, duplicate it, and set the correct class
        var duplicate = $customHeaders[0].cloneNode(true);
        duplicate.classList = "";
        duplicate.classList.add(this.options['headerClass']);
        duplicate.classList.add(this.options['defaultClass']);
        this.element.prepend(duplicate);
      }
    } else {
      // If there are no custom headers, just wrap the content and make that the default header
      (0, _util.wrapInner)(this.element, 'div', 'class', this.options['headerClass'] + ' ' + this.options['defaultClass']);
    } // Make a copy of the default header for use in the generic ones.


    var $customHeaders = this.element.querySelectorAll('.' + this.options['headerClass']);
    var $defaultHeader = this.element.querySelector('.' + this.options['headerClass'] + '.' + this.options['defaultClass']).cloneNode(true);

    for (var headerClass in this._headers) {
      if (!this._headers.hasOwnProperty(headerClass)) {
        continue;
      }

      if (typeof this._headers[headerClass].element === 'undefined') {
        // Create the outer clipping mask
        // If there's some custom markup, use it, or else just clone the default header
        var $existingHeader = this.element.querySelectorAll('.' + this.options['headerClass'] + '.' + headerClass);

        if ($existingHeader.length) {
          this._headers[headerClass].element = $existingHeader[0];
        } else {
          this._headers[headerClass].element = $defaultHeader.cloneNode(true);

          this._headers[headerClass].element.classList.remove(this.options['defaultClass']);

          this._headers[headerClass].element.classList.add(headerClass);

          this.element.appendChild(this._headers[headerClass].element);
        }

        var resetStyles = {
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        };
        Object.assign(this._headers[headerClass].element.style, resetStyles);

        if (this._transformMode !== false) {
          this._headers[headerClass].element.style[this._transformMode] = 'translateZ(0)';
        } // Create the inner clipping mask


        if (!this._headers[headerClass].element.querySelectorAll('.' + this.options['innerClass']).length) {
          (0, _util.wrapInner)(this._headers[headerClass].element, 'div', 'class', this.options['innerClass']);
        }

        this._headers[headerClass].inner = this._headers[headerClass].element.querySelector('.' + this.options['innerClass']);
        Object.assign(this._headers[headerClass].inner.style, resetStyles);

        if (this._transformMode !== false) {
          this._headers[headerClass].inner.style[this._transformMode] = 'translateZ(0)';
        } // Set the default clipping variables


        this._headers[headerClass].from = '';
        this._headers[headerClass].progress = 0.0;
      }
    } // TODO
    // Headers that weren't initialized have to be hidden


    (0, _forEach2["default"])($customHeaders, function ($header) {
      //var $header = $(this);
      var hasAnyClass = false;

      for (var headerClass in context._headers) {
        if (!context._headers.hasOwnProperty(headerClass)) {
          continue;
        }

        if ($header.classList.contains(headerClass)) {
          hasAnyClass = true;
        }
      } // Add the inner clipping mask just in case


      if (!$header.querySelectorAll('.' + context.options['innerClass']).length) {
        (0, _util.wrapInner)($header, 'div', 'class', context.options['innerClass']);
      }

      if (hasAnyClass) {
        (0, _util.showHide)($header, true);
      } else {
        (0, _util.showHide)($header, false);
      }
    });
  });

  _defineProperty(this, "_recalculateSections", function () {
    var body = document.body;
    var html = document.documentElement;
    this._documentHeight = Math.max(body.offsetHeight, body.scrollHeight, html.clientHeight, html.offsetHeight, html.scrollHeight); // Cache all the this._sections and their start/end positions (where the class starts and ends)

    this._sections = [];

    for (var ix = 0; ix < this._$sections.length; ix++) {
      var $section = this._$sections[ix];

      this._sections.push({
        element: $section,
        className: $section.dataset[this.options.sectionSelector],
        start: $section.offsetTop,
        end: $section.offsetTop + $section.offsetHeight
      });
    }
  });

  _defineProperty(this, "_updateHeaderHeight", function () {
    this._headerInfo.height = this._getContainerHeight();
    this.element.style.height = this._headerInfo.height + 'px';
  });

  _defineProperty(this, "_updateHeadersLoop", function () {
    // This works using requestAnimationFrame for better compatibility with iOS/Android
    var context = this;

    this._requestAnimationFrame(function () {
      context._updateHeadersLoop();
    });

    this._recalculateHeaders();

    this._updateHeaders();
  });

  _defineProperty(this, "_requestAnimationFrame", function (callback) {
    // Todo: This should be moved somewhere else
    var requestAnimationFrame = requestAnimationFrame || function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    }();

    requestAnimationFrame(callback);
  });

  _defineProperty(this, "_getContainerHeight", function () {
    var $customHeaders = this.element.querySelectorAll('.' + this.options['headerClass']);
    var maxHeight = 0;
    var height = 0;
    var context = this;

    if ($customHeaders.length) {
      (0, _forEach2["default"])($customHeaders, function ($header) {
        var $inner = $header.querySelector('.' + context.options['innerClass']); // Disable the fixed height and trigger a reflow to get the proper height
        // Get the inner height or just the height of the container

        if ($inner) {
          // Overflow: Auto fixes an issue with Chrome 41, where outerHeight() no longer takes into account
          // the margins of internal elements, creating a smaller container than necessary
          Object.assign($inner.style, {
            bottom: 'auto',
            overflow: 'auto'
          });
          height = $inner.offsetHeight;
          $inner.style.bottom = '0';
        } else {
          $header.style.bottom = 'auto';
          height = $header.offsetHeight;
          $header.style.bottom = '0';
        }

        maxHeight = height > maxHeight ? height : maxHeight;
      });
    } else {
      maxHeight = height = this.element.offsetHeight;
    }

    return maxHeight;
  });

  var _context = this;

  this.element = element; // merge options with defaults

  this.options = Object.assign({}, this.options, options);
  this._scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  this._documentHeight = document.clientHeight;
  this._headers = {};
  this._transformMode = this._getSupportedTransform(); // Calculate all sections and create the necessary headers

  this.refresh(); // (This is the ghetto way of keeping the section values updated after any kind of reflow. The overhead is minimal)

  setInterval(function () {
    _context._recalculateSections();
  }, 1000); // We need to recalculate all this._sections and headers

  _context.recalculate(); // and at every resize


  window.addEventListener('resize', function () {
    _context.recalculate();
  }); // Start the RequestAnimationFrame loop. This should be done just once.

  this._updateHeadersLoop();
};

var _default = Midday;
exports["default"] = _default;