"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
    headerClass: 'midnightHeader',
    // The class that wraps the contents of each header. Also used as a clipping mask.
    innerClass: 'midnightInner',
    // The class used by the default header (useful when adding multiple headers with different markup).
    defaultClass: 'default',
    // Unused: Add a prefix to the header classes (so if you set the "thingy-" prefix, a section with data-midnight="butterfly" will use the "thingy-butterfly" header)
    classPrefix: '',
    // If you want to use plugin more than once or if you want a different data attribute name (so if you set the "header" in a section use data-header)
    sectionSelector: 'midnight' // Cache element

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
    console.log('refresh');
    _this._headerInfo = {
      // Todo: Add support for top (though it's mostly unnecessary)
      top: 0,
      height: _this.element.outerHeight
    }; // Sections that affect the color of the header (and cache)
    //this._$sections = document.querySelectorAll('[data-'+ this.options.sectionSelector +']:not(:hidden)');
    // todo: strip out hidden sections

    _this._$sections = document.querySelectorAll('[data-' + _this.options.sectionSelector + ']');
    _this._sections = [];

    _this._setupHeaders(); //this.recalculate();

  });

  _defineProperty(this, "recalculate", function () {
    this._recalculateSections();

    this._updateHeaderHeighj();

    this._recalculateHeaders();

    this._updateHeaders();
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

    this.element.style = Object.assign({}, this.element.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      overflow: 'hidden'
    }); //this._updateHeaderHeight();

    var $customHeaders = this.element.querySelectorAll('.' + this.options['headerClass']);

    if ($customHeaders.length) {
      console.log($customHeaders); //if( ! $customHeaders.filter('.'+ this.options['defaultClass']).length ) {
      //// If there's no default header, just pick the first one, duplicate it, and set the correct class
      //$customHeaders.filter('.'+ this.options['headerClass'] +':first').clone(true, true).attr('class', this.options['headerClass'] +' '+ this.options['defaultClass']);
      //}
    } else {} // If there are no custom headers, just wrap the content and make that the default header
      //this.element.wrapInner('<div class="'+ this.options['headerClass'] +' '+ this.options['defaultClass'] +'"></div>');
      // Make a copy of the default header for use in the generic ones.
      //var $customHeaders = this.element.find('> .'+ this.options['headerClass']);
      //var $defaultHeader = $customHeaders.filter('.'+ this.options['defaultClass']).clone(true, true);
      //for( var headerClass in this._headers ) {
      //if( ! this._headers.hasOwnProperty(headerClass) ){ continue; }
      //if( typeof this._headers[headerClass].element === 'undefined' ) {
      //// Create the outer clipping mask
      //// If there's some custom markup, use it, or else just clone the default header
      //var $existingHeader = $customHeaders.filter('.'+headerClass);
      //if( $existingHeader.length ) {
      //this._headers[headerClass].element = $existingHeader;
      //} else {
      //this._headers[headerClass].element = $defaultHeader.clone(true, true).removeClass( this.options['defaultClass'] ).addClass(headerClass).appendTo( this.element );
      //}
      //var resetStyles = {
      //position: 'absolute',
      //overflow: 'hidden',
      //top: 0,
      //left: 0,
      //right: 0,
      //bottom: 0
      //};
      //this._headers[headerClass].element.css(resetStyles);
      //if( this._transformMode !== false ) {
      //this._headers[headerClass].element.css(this._transformMode, 'translateZ(0)');
      //}
      //// Create the inner clipping mask
      //if( ! this._headers[headerClass].element.find('> .'+ this.options['innerClass']).length ) {
      //this._headers[headerClass].element.wrapInner('<div class="'+ this.options['innerClass'] +'"></div>');
      //}
      //this._headers[headerClass].inner = this._headers[headerClass].element.find('> .'+ this.options['innerClass'])
      //this._headers[headerClass].inner.css(resetStyles);
      //if( this._transformMode !== false ) {
      //this._headers[headerClass].inner.css(this._transformMode, 'translateZ(0)');
      //}
      //// Set the default clipping variables
      //this._headers[headerClass].from = '';
      //this._headers[headerClass].progress = 0.0;
      //}
      //}
      //// Headers that weren't initialized have to be hidden
      //$customHeaders.each(function(){
      //var $header = $(this);
      //var hasAnyClass = false;
      //for( var headerClass in context._headers ) {
      //if( ! context._headers.hasOwnProperty(headerClass) ){ continue; }
      //if( $header.hasClass(headerClass) ){ hasAnyClass = true; }
      //}
      //// Add the inner clipping mask just in case
      //if( ! $header.find('> .'+ context.options['innerClass']).length ) {
      //$header.wrapInner('<div class="'+ context.options['innerClass'] +'"></div>');
      //}
      //if( hasAnyClass ) {
      //$header.show();
      //} else {
      //$header.hide();
      //}
      //});

  });

  this.element = element; // merge options with defaults

  this.options = Object.assign({}, this.options, options);
  this._scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  this._documentHeight = document.clientHeight;
  this._headers = {};
  this._transformMode = this._getSupportedTransform(); // Calculate all sections and create the necessary headers

  this.refresh();
};

var _default = Midday;
exports["default"] = _default;