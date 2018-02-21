# Matomo Opt-Out JavaScript without iframe and without cookies

With a little help from [tu-dresden.de](https://tu-dresden.de/) I created a script that lets users opt-out of [Matomo](https://matomo.org/) *(formerly Piwik)* data collection without the need for cookies or the default iframe provided by Matomo.

### Features

- no iframe
- no cookies
- fallback message for disabled JavaScript
- fallback message for old browsers that don’t support HTML5 Web Storage
- check for browser’s *Do Not Track* setting
- support for multiple languages in one page

### Dependencies
- jQuery 2.0+

### The HTML you need
Change *en* (3×) for any language code you like, but take care of adding this language to the matomoTrackingOptOut.js (*en* and *de* are added by default). You can add this HTML to one single page multiple times in different languages if you wish.
```html
<p class="matomo-optout" lang="en">
    <span class="js" style="display:none;">
        <input type="checkbox" name="matomo-optout" id="matomo-optout-en" checked>
        <label for="matomo-optout-en"></label>
    </span>
    <span class="nojs">Your browser appears to be too old to support this feature. For more privacy control please update your browser.</span>
</p>
```
### Additional JavaScript
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
Last but not least, reference the **matomoTrackingOptOut.js** or **matomoTrackingOptOut.min.js** in your Privacy Policy page or wherever you added the Opt-Out-HTML.
