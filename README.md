Microask
===============================================================================

<p align="center">
µ-scale feedback form<br />
<img src="microask.gif" />
</p>

Usage
-------------------------------------------------------------------------------

Install via `npm`:

```ShellSession
$ npm i --save microask
```

Next, add the stylesheet and a container element to your page's markup:

```html
<!-- in <head /> -->
<link rel="stylesheet" href="./node_modules/microask/microask.css" />

<!-- in <body /> -->
<div id="my-ask"></div>
```

Finally, require `microask` and instantiate it in an existing DOM element:

```js
const Microask = require('microask');

window.addEventListener('DOMContentLoaded', function () {
  const el = document.getElementById('my-ask');
  const ask = new Microask(el);

  ask
    .update('<p>Hello, world!</p>')
    .show();
});
```

API
-------------------------------------------------------------------------------

All methods return an instance of `Microask` to enable chaining.

#### `.show(0) => Microask`

Show the microask.

#### `.hide(0) => Microask`

Hide the microask.

#### `.hideAfter(delay: Number) => Microask`

Delay hide until `delay` ms have elapsed

#### `.update(htmlStr: String, cb: Function?) => Microask`

Set microask HTML to `htmlStr`. If `callback` is provided, it will receive the
updated element once the update is complete.

#### `.updateAfter(htmlStr: String, delay: Number, cb: Function?) => Microask`

Delay update until `delay` ms have elapsed

#### `.buttonScene(opts: Object) => Microask`

Render a button scene.

```js
ask.buttonScene({
  id: 'buttons',
  prompt: 'Can you click it?',
  actions: [
    {
      label: 'Click me',
      value: 'ok',
      callback: ask => ask
        .updateAfter('<p>Good job!</p>', 100)
        .hideAfter(2000),
    },
  ],
});
```

### `.textScene(opts: Object) => Microask`

Render a text scene.

```js
ask.textScene({
  id: 'email',
  prompt: 'What\'s on your mind?',
  placeholder: 'Start typing',
  callback: ask => ask.hide(),
});
```

License
-------------------------------------------------------------------------------

MIT
