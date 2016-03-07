"use strict";

var Utils = {
  "addEvent": function(obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
      obj.attachEvent('on' + type, function() { return fn.apply(obj, [window.event]);});
    }
  },

  "strToDom": function(str) {
    var container = document.createElement("div");
    container.innerHTML = str;
    return container.children[0];
  }
};

module.exports = Utils;
