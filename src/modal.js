"use strict";

var modalHtml = require("./html/modal.html");

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

module.exports = function(html_or_dom,options) {
  addEvent(window, 'load', function() {
    var modal = document.body.appendChild(strToDom(modalHtml));
    var modalDialog = modal.getElementsByClassName("__modal_dialog__")[0];
    var modalBackdrop = modal.getElementsByClassName("__modal_backdrop__")[0];

    var dialogContentDOM = (typeof dialogContent === "string") ? strToDom(html_or_dom) : html_or_dom;
    modalDialog.appendChild(dialogContentDOM);

    var opts = (typeof options === "undefined") ? {} : options;

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
