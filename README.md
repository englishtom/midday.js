## Midday

NOTE: This module is a port of a jQuery plugin using just Javascript.

The original author is [Aerolab](https://github.com/Aerolab).

The original plugin's repository can be found [here](https://github.com/Aerolab/midnight.js).

Description: A module that switches between multiple header designs as you scroll, so you always have a header that looks great with the content below it.

## Installation

Midday is available on NPM as **midday.js**:

```
npm install midday.js
```

## Quick start

Create your fixed nav (or header) as you typically would. For an example, something like this (you can use whatever markup suits you)

```html
<nav class="fixed">
  <a class="logo">Logo</a>
</nav>
```

**Make sure the header works well with position:fixed**


After that, take any sections of your page that need a different nav and add **data-midday="your-class"** to it, where *your-class* is the class you are going to use to style that header. If you don't use the property or just leave it blank, the .default header will be used for that section.

```html
<section data-midday="white">
  <h1>A section with a dark background, so a white nav would look better here</h1>
</section>

<div data-midday="blue">
  <h1>A blue nav looks better here</h1>
</div>

<footer>
  <h1>This will just use the default header</h1>
</footer>
```

Multiple headers as necessary will be created based on the classes declared in these sections.

You can style it in your css using the class .middayHeader.your-class (replace your-class with the correct one). For example:


```css
.middayHeader.default {
  background: none;
  color: black;
}
.middayHeader.white {
  background: white;
  color: black;
}
.middayHeader.blue {
  background: blue;
  color: white;
}
.middayHeader.red {
  background: red;
  color: white;
}
```


To initialize, just load midday and initialize it

```js
import Midday from 'midday.js';

// Change this to the correct selector for your nav.
const fixedNav = new Midday(document.getElementById('fixedNav'), {});
```


## Using custom markup

Let's say you want to create a special header with a butterfly in it, which needs some extra markup. You need to do two things:

* First, add a div with the class **.middayHeader.default** . This will be the header that's used for every section (that doesn't have a specific style) and duplicated as necessary, automatically replacing .default with the correct class.

* Then, add a div with the class **.middayHeader.your-class** (like .butterfly). This will be used in that case instead, so you can use some custom markup in that case. Repeat this step for any other header with custom markup.

* Keep in mind that **all headers need to be the same height**. Take that into account when styling your headers. If you have one that's larger than usual, we recommend you make all the headers the same height and try to handle it with additional markup.


```html
<nav class="fixed">
  <!-- Your standard header -->
  <div class="middayHeader default">
    <a class="logo">Logo</a>
  </div>

  <!-- A header with a butterfly -->
  <div class="middayHeader butterfly">
    <a class="logo">Logo</a>

    <!-- a butterfly icon -->
    <div class="img">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
            <g><g><path fill="white" d="M691,859c-22.9,0-44.6-5.7-65-17c-56-31.2-91.4-101.6-116.1-174.2c-47.8,92.2-138.7,224-252,182.7c-26.7-9.7-70.8-39.6-65.9-130c1.9-35.5,11.4-75,26-111.1c-69-55-188.8-168.6-205.8-281.3c-7.7-51.2,5.5-96.9,39.2-135.7c36.2-43.5,85.5-60,142.1-47.2c110.8,25.2,237.2,168,300.7,278.9c60.1-86,201-236.4,324.5-262.8c55.4-11.8,103.5,2.3,138.9,40.9c21.2,23.2,43.2,65.3,26.8,134.3C961,434.6,869.9,548.9,805.5,610.5c13.8,38,21.1,79.5,19.3,114.6c-3.2,64.5-33.4,109.2-84.9,125.8C723.1,856.3,706.8,859,691,859z M526.2,491.8c2.1,6.2,4,12,5.4,17.4l5,20.1c20.5,82.7,54.9,221.2,120.1,257.5c18.8,10.5,39.7,11.8,63.9,4c25.5-8.2,39.3-31.3,41.2-68.9c1.2-23.2-2.3-47.3-8.6-69.6c-1.6,0.8-3.1,1.5-4.5,2c-36.4,13.8-96.1,1.1-121.7-36.3c-9.7-14.1-27.5-52.1,15.6-100.1c22.8-23.4,51.3-29.3,79.2-17.1c20.3,8.9,38.7,26.9,54.2,50.1c54.7-56.9,134.1-157.1,148.7-237.7c5.4-29.9,1-52.2-13.8-68.2c-20.3-22.1-45.3-29-79.2-21.8C706.2,249.9,541.5,454.2,526.2,491.8z M271,647.1c-6.5,18.2-11.7,38.2-14.5,59.3c-2.3,17.1-7.4,73.7,22.9,84.8c83.3,30.3,173.3-141,203.7-215.7c-2.7-10.8-5.3-21.1-7.8-31l-4.9-19.8C448.8,439,297.3,233.5,179.4,206.8c-33.3-7.6-58.7,0.9-80.1,26.5c-21.8,25.1-29.8,52.9-24.9,85.4C87.7,406,186.3,501.5,247.7,552.2c19.8-29.7,43.4-51.4,68.4-57.6c14-3.4,49.3-6.8,75.3,36.7c0.4,0.7,0.8,1.5,1.2,2.2c24.3,49.3,8.6,87.5-14.3,106.8C350.1,664.2,306.9,666.5,271,647.1z M298.3,590c14.9,9.4,31.7,8.5,39.4,2.1c8.2-6.9,2.4-22.2-1.1-29.5c-3-4.8-5.3-6.7-6-7C324.1,556.3,311.5,569,298.3,590z M693.7,557.7c-1.3,0-2.6,0.9-5,3.3c-1.6,1.8-13.5,15.6-9.5,21.3c7.3,10.8,35.6,17.2,47.3,12.9c0.6-0.4,1.5-0.8,2.3-1.3c-10.7-18.1-22.3-31-32.1-35.3C695.5,558.1,694.6,557.7,693.7,557.7z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g>
        </svg>
    </div>
  </div>
</nav>
```


## Options

You can use a variety of custom options when using midday:

```js
import Midday from 'midday.js';

const fixedNav = new Midday(document.getElementById('fixedNav'), {
    // The class that wraps each header. Used as a clipping mask.
    headerClass: 'middayHeader',
    // The class that wraps the contents of each header. Also used as a clipping mask.
    innerClass: 'middayInner',
    // The class used by the default header (useful when adding multiple headers with different markup).
    defaultClass: 'default'
});
```


## Running Multiple Instances with Different Breakpoints

If you want to run multiple instances of midday with different breakpoints, you can use the *sectionSelector* option to choose where each nav is going to be split.

By default, the plugin will look for all the sections with the *data-midday* attribute, which is the default, but you can change this to suit your needs. For example:

```js
import Midday from 'midday.js';

const fixedNavOne = new Midday(document.getElementById('fixedNavOne'), {
    // By default, sectionSelector is 'midday'. It will switch only on elements that have the data-midday attribute.
    sectionSelector: 'midday'
});

const fixedNavTwo = new Midday(document.getElementById('fixedNavTwo'), {
    // We want this nav to switch only on elements that have the data-noon attribute.
    sectionSelector: 'noon'
});
```

## Known Issues

On iOS <7 and older Android devices scrollTop isn't updated fluently, which creates a choppy effect. It can be fixed somewhat by wrapping the body in container and detecting touch events, but we're leaving that as an open issue. We'll probably disable the effect on older mobile devices due to bad performance.

You shouldn't add any sort of padding, margin or offset (top/left/right/bottom) to the nav, since it causes issues with rendering.
