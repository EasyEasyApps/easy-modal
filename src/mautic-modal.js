"use strict";

var Modal = require("./modal"),
    Utils = require("./utils"),
    ouibounce = require("ouibounce");

var MauticSubscribeModal = function(html_or_dom, options) {
  var submittingMessage = (options && options.submittingMessage) || "Please wait...";
  var ouibounceOptions = (options && options.ouibounce) || {
    aggressive: true,
    timer: 0
  };
  var mauticFormId = options && options.mauticFormId;
  var successCallback = options && options.onSubmit;
  var mauticDomain = options && options.mauticDomain;

  var modal = Modal(html_or_dom, {
    dialogClass: "modal-dialog",
    backdropClass: "modal-backdrop"
  });

  if (typeof window.MauticSDKLoaded === 'undefined') {
    Utils.addEvent(window, "load", function() {
      console.log("window.load MauticSDK");
      window.MauticSDK.onLoad();
    });
    window.MauticSDKLoaded = true;
    window.MauticDomain = mauticDomain;
    window.MauticLang   = {
      'submittingMessage': submittingMessage
    };

    var head            = document.getElementsByTagName('head')[0];
    var script          = document.createElement('script');
    script.type         = 'text/javascript';
    script.src          = mauticDomain + '/media/js/mautic-form.js';
    head.appendChild(script);
  }

  if (mauticFormId) {
    if (typeof window.MauticFormCallback === "undefined") {
      window.MauticFormCallback = {};
    }
    if (typeof window.MauticFormCallback[mauticFormId] === "undefined") {
      window.MauticFormCallback[mauticFormId] = {};
    }
    var onResponse = window.MauticFormCallback[mauticFormId].onResponse;
    window.MauticFormCallback[mauticFormId].onResponse = function() {
      if(onResponse) {
        onResponse.apply(this, arguments);
      }
      if (successCallback) {
        successCallback();
      }
      modal.hide();
    };
  }

  ouibounce(modal, ouibounceOptions);
};

module.exports = MauticSubscribeModal;
