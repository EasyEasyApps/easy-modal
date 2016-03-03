!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.OuibounceTag=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){


(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(_dereq_,exports,module);
  } else {
    root.ouibounce = factory();
  }
}(this, function(_dereq_,exports,module) {

return function ouibounce(el, config) {
  var config     = config || {},
    aggressive   = config.aggressive || false,
    sensitivity  = setDefault(config.sensitivity, 20),
    timer        = setDefault(config.timer, 1000),
    delay        = setDefault(config.delay, 0),
    callback     = config.callback || function() {},
    cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
    cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
    cookieName   = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
    sitewide     = config.sitewide === true ? ';path=/' : '',
    _delayTimer  = null,
    _html        = document.documentElement;

  function setDefault(_property, _default) {
    return typeof _property === 'undefined' ? _default : _property;
  }

  function setDefaultCookieExpire(days) {
    // transform days to milliseconds
    var ms = days*24*60*60*1000;

    var date = new Date();
    date.setTime(date.getTime() + ms);

    return "; expires=" + date.toUTCString();
  }

  setTimeout(attachOuiBounce, timer);
  function attachOuiBounce() {
    _html.addEventListener('mouseleave', handleMouseleave);
    _html.addEventListener('mouseenter', handleMouseenter);
    _html.addEventListener('keydown', handleKeydown);
  }

  function handleMouseleave(e) {
    if (e.clientY > sensitivity || (checkCookieValue(cookieName, 'true') && !aggressive)) return;

    _delayTimer = setTimeout(_fireAndCallback, delay);
  }

  function handleMouseenter(e) {
    if (_delayTimer) {
      clearTimeout(_delayTimer);
      _delayTimer = null;
    }
  }

  var disableKeydown = false;
  function handleKeydown(e) {
    if (disableKeydown || checkCookieValue(cookieName, 'true') && !aggressive) return;
    else if(!e.metaKey || e.keyCode !== 76) return;

    disableKeydown = true;
    _delayTimer = setTimeout(_fireAndCallback, delay);
  }

  function checkCookieValue(cookieName, value) {
    return parseCookies()[cookieName] === value;
  }

  function parseCookies() {
    // cookies are separated by '; '
    var cookies = document.cookie.split('; ');

    var ret = {};
    for (var i = cookies.length - 1; i >= 0; i--) {
      var el = cookies[i].split('=');
      ret[el[0]] = el[1];
    }
    return ret;
  }

  function _fireAndCallback() {
    fire();
    callback();
  }

  function fire() {
    // You can use ouibounce without passing an element
    // https://github.com/carlsednaoui/ouibounce/issues/30
    if (el) el.style.display = 'block';
    disable();
  }

  function disable(options) {
    var options = options || {};

    // you can pass a specific cookie expiration when using the OuiBounce API
    // ex: _ouiBounce.disable({ cookieExpire: 5 });
    if (typeof options.cookieExpire !== 'undefined') {
      cookieExpire = setDefaultCookieExpire(options.cookieExpire);
    }

    // you can pass use sitewide cookies too
    // ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
    if (options.sitewide === true) {
      sitewide = ';path=/';
    }

    // you can pass a domain string when the cookie should be read subdomain-wise
    // ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
    if (typeof options.cookieDomain !== 'undefined') {
      cookieDomain = ';domain=' + options.cookieDomain;
    }

    if (typeof options.cookieName !== 'undefined') {
      cookieName = options.cookieName;
    }

    document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;

    // remove listeners
    _html.removeEventListener('mouseleave', handleMouseleave);
    _html.removeEventListener('mouseenter', handleMouseenter);
    _html.removeEventListener('keydown', handleKeydown);
  }

  return {
    fire: fire,
    disable: disable
  };
}
;

}));

},{}],2:[function(_dereq_,module,exports){
"use strict";

// var $ = require("jquery");
var ouibounce = _dereq_("ouibounce");

var modalHtml = _dereq_("./html/modal.html");

function addEvent(obj, type, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(type, fn, false);
  } else if (obj.attachEvent) {
    obj.attachEvent('on' + type, function() { return fn.apply(obj, [window.event]);});
  }
}

function strToDom(str) {
  var container = document.createElement("div");
  container.innerHTML = str;
  return container.children[0];
}

function hide(el) {
  el.style.display = 'none';
}

/*
function show(el) {
  el.style.display = 'block';
}
*/

module.exports = function(opts) {
  addEvent(window, 'load', function() {
    var modal = document.body.appendChild(strToDom(modalHtml));
    var modalDialog = modal.getElementsByClassName("__modal_dialog__")[0];
    var modalBackdrop = modal.getElementsByClassName("__modal_backdrop__")[0];

    var dialogContent = opts["html"];
    if (dialogContent) {
      modalDialog.appendChild(strToDom(dialogContent));
    }

    var modalClass = opts["modalClass"];
    if (modalClass) {
      modal.className += " " + modalClass;
      // modal.addClass(modalClass);
    }

    var dialogClass = opts["dialogClass"];
    if (dialogClass) {
      modalDialog.className += " " + dialogClass;
      // modalDialog.addClass(dialogClass);
    }

    var backdropClass = opts["backdropClass"];
    if (backdropClass) {
      modalBackdrop.className += " " + backdropClass;
      // modalBackdrop.addClass(backdropClass);
    }

    var ouibounceOptions = opts["ouibounce"] || {};
    ouibounce(modal, ouibounceOptions);

    addEvent(document.body, 'click', function() {
      console.log("body click");
      hide(modal);
    });

    var modalCloseEls = modal.getElementsByClassName("close");
    var hideModal = function() {
      hide(modal);
    };
    for (var closeEl in modalCloseEls) {
      addEvent(closeEl, "click", hideModal);
    }

    addEvent(modalDialog, "click", function(ev) {
      console.log("__modal_dialog__ click");
      var e = !ev ? window.event : ev;
      e.cancelBubble = true;
      if (e.stopPropagation) {
        e.stopPropagation();
      }
    });
  });
};

},{"./html/modal.html":3,"ouibounce":1}],3:[function(_dereq_,module,exports){
module.exports = "<div style=\"display:none;position:fixed;width:100%;height:100%;top:0;left:0;\">\n  <div class=\"__modal_backdrop__\" style=\"width:100%;height:100%;position:absolute;top:0;left:0;\"></div>\n  <div class=\"__modal_dialog__\" style=\"width:600px;height:400px;z-index:1;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;\">\n  </div>\n</div>\n";

},{}]},{},[2])
(2)
});