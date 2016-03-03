# Ouibounce

Ouibounce: A small JS library that allows a user to create modals with custom markup.

## Installation

You have a few options to choose from:

- Download the [minified](dist/modal.js) script and include it on your page
- Use NPM: `npm install easy-modal`

## Usage

_Example:_    
```js
Modal("<h1>Modal Title</h1>");
```

_Example with dom element:_
```js
Modal(document.getElementById("some-id"));
```

### Options

Ouibounce offers a few options, such as:

var  = opts["modalClass"];
var dialogClass = opts["dialogClass"];
var backdropClass = opts["backdropClass"];

- [Modal CSS class](#modal-class)
- [Dialog CSS class](#dialog-class)
- [Backdrop CSS class](#"backdrop-class")

##### Modal CSS class
If you want to apply style to the modal root element you use modalClass param.
_Example:_    
```js
Modal("<h1>Modal Title</h1>", {modalClass: "modal"});
```

##### Dialog CSS class

_Example:_    
```js
ouibounce("<h1>Modal Title</h1>", {dialogClass: "dialog"});
```

##### Backdrop CSS class
_Example:_    
```js
ouibounce("<h1>Modal Title</h1>", {backdropClass: "glass"});
```
