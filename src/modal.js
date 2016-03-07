"use strict";

var Utils = require("./utils"),
    modalHtml = require("./html/modal.html");

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = 'block';
}

var addEvent = Utils.addEvent;
var strToDom = Utils.strToDom;

module.exports = function(html_or_dom,options) {
  var modal = strToDom(modalHtml);


  var modalDialog = modal.getElementsByClassName("__modal_dialog__")[0];
  var modalBackdrop = modal.getElementsByClassName("__modal_backdrop__")[0];

  var dialogContentDOM = (typeof html_or_dom === "string") ? strToDom(html_or_dom) : html_or_dom;
  modalDialog.appendChild(dialogContentDOM);

  var opts = (typeof options === "undefined") ? {} : options;

  var modalClass = opts.modalClass;
  if (modalClass) {
    modal.className += " " + modalClass;
    // modal.addClass(modalClass);
  }

  var dialogClass = opts.dialogClass;
  if (dialogClass) {
    modalDialog.className += " " + dialogClass;
    // modalDialog.addClass(dialogClass);
  }

  var backdropClass = opts.backdropClass;
  if (backdropClass) {
    modalBackdrop.className += " " + backdropClass;
    // modalBackdrop.addClass(backdropClass);
  }

  addEvent(document.body, 'click', function() {
    hide(modal);
  });

  var modalCloseEls = modal.getElementsByClassName("close");
  var hideModal = function() {
    hide(modal);
  };
  for (var i = 0; i < modalCloseEls.length; i++) {
    addEvent(modalCloseEls[i], "click", hideModal);
  }

  addEvent(modalDialog, "click", function(ev) {
    var e = !ev ? window.event : ev;
    e.cancelBubble = true;
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  });

  addEvent(window, 'load', function() {
    document.body.appendChild(modal);
  });

  modal.hide = function() {
    hide(modal);
  };

  modal.show = function() {
    show(modal);
  };

  return modal;
};
