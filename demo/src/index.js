var Microask = require('../../microask');

function demoTextScene (ask) {
  var onTextSceneSubmit = function () {
    ask
      .updateAfter('<p>Thanks for that!</p>', 100)
      .hideAfter(2000);
  };

  ask
    .textScene({
      id: 'email',
      prompt: 'Enter your email:',
      placeholder: 'x@example.org',
      callback: onTextSceneSubmit,
    });
}

function demoButtonScene (ask) {
  ask
    .buttonScene({
      id: 'buttons',
      prompt: 'Do you like making decisions?',
      actions: [
        { label: 'Yes!', value: 'yes', callback: onYesClick },
        { label: 'Nope', value: 'no', callback: onNoClick },
      ],
    });

  function onYesClick (ask) {
    ask
      .updateAfter('<p>Outstanding!</p>', 100)
      .hideAfter(2000);
  }

  function onNoClick (ask) {
    ask
      .updateAfter('<p>Sorry to hear that :-/</p>', 100)
      .hideAfter(2000);
  }
}

function onClick(id, callback) {
  var el = document.getElementById(id);
  el && el.addEventListener('click', function (e) {
    e.preventDefault();
    callback(e);
  });
}

window.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('microask-demo');
  var log = document.getElementById('demo-log');
  var ask = new Microask(el);

  ask.update('<p>choose a scene!</p>');

  ask.addListener('event', function (e) {
    log.value = JSON.stringify(e) + '\n' + log.value;
  });

  onClick('demo-show', function () {
    ask.show();
  });

  onClick('demo-hide', function () {
    ask.hide();
  });

  onClick('demo-hide-after', function () {
    ask.hideAfter(300);
  });

  onClick('demo-button', function () {
    demoButtonScene(ask);
    ask.show();
  });

  onClick('demo-text', function () {
    demoTextScene(ask);
    ask.show();
  });
});
