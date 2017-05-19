### Create a frame

```
$ mkdir my-new-frame
$ npm init # create your frame package
```

> It's convention for the name to be `*-frame` and to use the `frame` keyword.

TBC.

### Install frame as a dev dependency of your project

```
$ cd my-project
$ npm install frame my-new-frame --save-dev
```

TBC.

### Configure your project

Add `frame.config.js` to your root

```js
module.exports = {
  source: 'my-new-frame'
};
```

TBC.

### Update your project against your frame

TBC.