<h1 align="center">
  Listen Proxy
</h1>

<section id="badges" align="center">

[![Node.js CI](https://github.com/XavierFabregat/ProxyNPM/actions/workflows/node.js.yml/badge.svg)](https://github.com/XavierFabregat/ProxyNPM/actions/workflows/node.js.yml)
[![version](https://img.shields.io/npm/v/listen-proxy.svg?style=flat-square)](https://npmjs.org/listen-proxy)
<!-- [![Coverage Status](https://coveralls.io/repos/github/XavierFabregat/ProxyNPM/badge.svg?branch=main)](https://coveralls.io/github/XavierFabregat/ProxyNPM?branch=main) -->
[![license](https://img.shields.io/npm/l/listen-proxy?color=%23007a1f&style=flat-square)](https://github.com//XavierFabregat/blob/master/LICENSE)
<a href="https://github.com/XavierFabregat/ProxyNPM/blob/229236742a0f210399f884745bb056fff194fea1/README.md"><img alt="Coverage: 100%" src="https://img.shields.io/badge/Coverage-100%25-brightgreen.svg" /></a>
----------------

[![dependancies](https://img.shields.io/librariesio/release/npm/listen-proxy?color=%23007a1f&style=flat-square)](https://libraries.io/npm/listen-proxy)
[![downloads](https://img.shields.io/npm/dm/listen-proxy?style=flat-square&color=%23007a1f)](https://npmcharts.com/compare/listen-proxy)

[![stargazers](https://img.shields.io/github/stars/XavierFabregat/ProxyNPM?style=social)](https://github.com/XavierFabregat/ProxyNPM/stargazers)
[![number of forks](https://img.shields.io/github/forks/XavierFabregat/ProxyNPM?style=social)](https://github.com/XavierFabregat/ProxyNPM/fork)


</section>

<br>


<h2><b>What?</b></h2>

<p> This is a utility npm package that allows you to bind a set of callbacks <i>"listeners"</i> to an object, with the <code>createProxy</code> function. Those listeners will be fired when a property is added, deleter or modified.</p>

<p> 
The listener methods given have to have a specific name, mainly, given a property in or object named <b>example</b>, you will havee access to 3 methods:

- <b>onExampleAdd</b>: Callback that will be fired when the example property is added.
- <b>onExampleDelete</b>: Callback that will be fired when the example property is deleted.
- <b>onExampleChange</b>: Callback that will be fired when the example property is changed.

</p>


<h2><b>Why?</b></h2>

This package was created because I wanted to test some TS features, credit must be given to [Jack Herrington](https://github.com/jherr), since a video he did about mapped types was the inspiration for this package, I'll leave the video at the bottom of the readme.


<h2><b>How?</b></h2>

<p> To use this package, you have to install it with npm or yarn, and then import it in your project.</p>

```bash
npm install listen-proxy
```

```bash
yarn add listen-proxy
```

```ts
import { createProxy } from "listen-proxy";
```

<p> Once you have imported the package, you can use the <code>createProxy</code> function to create a proxy object, and then bind your listeners to it.</p>

```ts

const dog = {
  name: 'Rex',
  age: 3,
};

const dogListeners = {
  onNameChange: (value, oldValue, target) => {
    console.log(`The dog's name changed from ${oldValue} to ${value}`, target);
  },
  onAgeDelete: (oldValue) => {
    console.log(`The dog's age was deleted, his age was ${oldValue}`);
  },
  onBreedAdd: (value, target) => {
    console.log(`The dog's breed was added, his breed is ${value} his name is ${target.name}`);
  },
};

const proxy = createProxy(dog, dogListeners);


dog.name = 'Rexy'; // The dog's name changed from Rex to Rexy { name: 'Rexy', age: 3 }
delete dog.age; // The dog's age was deleted, his age was 3
dog.breed = 'Labrador'; // The dog's breed was added, his breed is Labrador his name is Rexy

```

<p> As you can see, the <code>createProxy</code> function takes two arguments, the first one is the object you want to bind the listeners to, and the second one is an object containing the listeners.</p>

<p>This project has full TypeScript support, you will find the following type:</p>

```ts
import { Listeners } from "listen-proxy";
```

<p> Which you can use to type your listeners object.</p>

If you find any bugs or errors, please let me know by creating an issue [here](https://github.com/XavierFabregat/ProxyNPM/issues).

And if you want to contribute, please feel free to do so by [opening a PR](https://github.com/XavierFabregat/ProxyNPM/pulls).


----------------

[No Bs Ts video](https://www.youtube.com/watch?v=0-BsmzlMMIw)
