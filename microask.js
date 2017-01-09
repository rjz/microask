var EventEmitter = require('events').EventEmitter;
var util = require('util');

module.exports = Widget;

function Widget (el) {
  this.el = el;
  el.className += ' microask'
  this._className = el.className;
  this._isHiding = null;

  el.innerHTML = '';
  this._appendContent('');
}

util.inherits(Widget, EventEmitter);

var contentClasses = {
  base: 'microask__content',
  enter: 'microask__content--entering',
  exit: 'microask__content--exiting',
};

var TRANSITION_TIME = 500;
var keys = {
  ENTER: 13,
};

Widget.prototype._appendContent = function (htmlStr) {
  var content = document.createElement('div');
  content.className = [
    contentClasses.base,
    contentClasses.enter,
  ].join(' ');
  content.innerHTML = htmlStr;
  this.el.appendChild(content);

  // Trigger animation immediately
  setTimeout(function () {
    content.className = contentClasses.base;
  }, 10);
  this.content = content;
  this.el.style.height = this.content.clientHeight + 'px';
  return content;
}

Widget.prototype._emitEvent = function (id, action, value) {
  this.emit('event', {
    id: id,
    action: action,
    value: value,
  });
};

Widget.prototype.update = function (htmlStr, cb) {
  var oldContent = this.content;
  oldContent.className = [
    contentClasses.base,
    contentClasses.exit,
  ].join(' ');

  setTimeout(function () {
    oldContent.parentNode.removeChild(oldContent);
  }, TRANSITION_TIME);

  var newContent = this._appendContent(htmlStr);
  if (cb && typeof cb === 'function') {
    cb(newContent);
  }
  return this;
};

Widget.prototype.buttonScene = function (opts) {
  var widget = this;
  var actions = opts.actions;
  var onButtonClick = function (button, i) {
    button.addEventListener('click', function (e) {
      var value = actions[i].value || actions[i].label;
      e.preventDefault();
      widget._emitEvent(opts.id, 'click', value);
      actions[i].callback.call(null, widget, e);
    });
  };

  widget.update([
    '<label>' + opts.prompt + '</label>',
    actions.map(function (action) {
      return '<button>' + action.label + '</button>';
    }).join(''),
  ].join(''), function (el) {
    [].map.call(el.getElementsByTagName('button'), onButtonClick);
  });
  return this;
};

Widget.prototype.textScene = function (opts) {
  var widget = this;
  widget.update([
    '<label>' + opts.prompt + '</label>',
    '<input type="text" placeholder="' + opts.placeholder + '" />',
  ].join(''), function (el) {
    [].map.call(el.getElementsByTagName('input'), function (input, i) {
      input.addEventListener('keypress', function (e) {
        if (e.keyCode === keys.ENTER) {
          e.preventDefault();
          widget._emitEvent(opts.id, 'submit', e.target.value);
          opts.callback && opts.callback.call(null, widget);
        }
      });
    });
  });
  return this;
};

Widget.prototype.updateAfter = function (htmlStr, delay, cb) {
  window.setTimeout(this.update.bind(this, htmlStr, cb), delay);
  return this;
};

Widget.prototype.show = function () {
  clearTimeout(this._isHiding);
  this.el.className = this._className + ' active';
  return this;
};

Widget.prototype.hide = function (delay) {
  clearTimeout(this._isHiding);
  this.el.className = this._className;
  return this;
};

Widget.prototype.hideAfter = function (delay) {
  var finalDelay = delay || 0;
  var widget = this;
  if (!this._isHiding) {
    this._isHiding = window.setTimeout(function () {
      widget.hide();
      widget._isHiding = null;
    }, delay);
  }
  return this;
};
