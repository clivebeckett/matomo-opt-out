# Matomo Opt-Out JavaScript without iframe and without cookies

Inspired by one line of code in the HTML of [tu-dresden.de](https://tu-dresden.de/) I created a script that lets users opt-out of [Matomo](https://matomo.org/) *(formerly Piwik)* data collection – without the need for cookies or the default iframe provided by Matomo.

## Features

- no iframe
- no cookies (using HTML5 Web Storage instead)
- fallback message for disabled JavaScript
- fallback message for old browsers that don’t support HTML5 Web Storage
- check for browser’s *Do Not Track* setting
- support for multiple languages in one page

## The HTML for the actual opt-out checkbox

Add this to the page(s) where you want your visitors to find the opt-out checkbox – probably within the privacy statement.
Change *en* (3×) for any language code you like, but take care of adding this language to the matomoTrackingOptOut.js (*en* and *de* are added by default). You can add this HTML to one single page multiple times in different languages if you wish.
```html
<p class="matomo-optout" lang="en">
    <span class="js" style="display:none;">
        <input type="checkbox" name="matomo-optout" id="matomo-optout-en" checked>
        <label for="matomo-optout-en"></label>
    </span>
    <span class="nojs">It appears you have deactived JavaScript in your browser. This feature is only available with JavaScript turned on. If you don’t want your data to be collected, you can still turn on <em>Do Not Track</em> in your browser which is a general setting and is being respected by our Matomo installation.</span>
</p>
```

## Additional JavaScript

This enables Matomo tracking at its first call and should be called on every page on the website (e.g. in a script that gets loaded on every page). Take care to call it …
- … before the actual opt-out script
- … before the Matomo/Piwik integration

```javascript
if (typeof(Storage) !== 'undefined') {
	if (localStorage.getItem('matomoTrackingEnabled') === null) {
		localStorage.setItem('matomoTrackingEnabled', 'true');
	}
}
```

Wrap your Matomo JavaScript Tracking Code embedding in this condition:

```javascript
if (localStorage.getItem('matomoTrackingEnabled') !== 'false') {
    var _paq = _paq || [];
    _paq.push(['disableCookies']);
        ...
    })();
}
```
Last but not least, reference the **matomoTrackingOptOut.js** or **matomoTrackingOptOut.min.js** in your Privacy Policy page or wherever you added the above-mentioned opt-out-HTML.

## Credits

[Jon Uhlmann](https://github.com/jonnitto) stripped the JavaScript from the jQuery dependency.
