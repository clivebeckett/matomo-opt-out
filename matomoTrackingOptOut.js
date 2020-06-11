/******************************************************
 * Matomo Opt-out
 * 2018 Clive Beckett, https://coding.musikinsnetz.de/
 * licensed under the GNU GENERAL PUBLIC LICENSE, v3
 * Details and README under
 * https://github.com/clivebeckett/matomo-opt-out
 * Check README for the additional code you’ll need!
 ******************************************************/

/**
 * set whether you have your Matomo installation respect the browser’s DoNotTrack option
 * @var DO_NOT_TRACK_RESPECTED boolean
 */
const DO_NOT_TRACK_RESPECTED = true;

/**
 * The basis selector of the matomo output
 * @var BASE_SELECTOR string
 */
const BASE_SELECTOR = '.matomo-optout';

/**
 * language snippets
 * just duplicate one of the language blocks to add other languages
 * @object LANG_SNIPPETS
 */
const LANG_SNIPPETS = {
    en: {
        trackingActive:
            'Currently your visit to this website <strong>is being anonymously tracked</strong> by the Matomo Web Analytics Tool. Uncheck this box to stop being tracked.',
        trackingInActive:
            'Currently your visit to this website <strong>is not being tracked</strong> by the Matomo Web Analytics Tool. Check this box to activate anonymous tracking and help us improve our website.',
        doNotTrackActive:
            'You have activated the <em>Do Not Track</em> option in your browser settings. This setting is being respected by the Matomo Web Analytics Tool on our website. There’s no need for you to opt-out of this website’s data tracking.',
        localStorageNotAvailable:
            'Your browser appears to be too old to support this feature. For more privacy control please update your browser.',
    },
    de: {
        trackingActive:
            'Ihr Besuch auf dieser Website wird derzeit durch das Matomo-Webanalyse-Tool <strong>anonym erfasst</strong>. Klicken Sie hier um die Datenerfassung zu beenden.',
        trackingInActive:
            'Ihr Besuch auf dieser Website wird derzeit <strong>nicht</strong> durch das Matomo-Webanalyse-Tool <strong>erfasst</strong>. Klicken Sie hier um anonyme Datenerfassung zu aktivieren und uns dabei zu helfen, unsere Website zu verbessern.',
        doNotTrackActive:
            'Sie haben die <em>Do-Not-Track</em>-Option in Ihren Browser-Einstellungen aktiviert. Diese Einstellung wird von unserem Matomo-Webanalyse-Tool respektiert. Es ist daher nicht notwendig, die Datenerhebung für diese Website zu deaktivieren.',
        localStorageNotAvailable:
            'Ihr Browser scheint zu alt zu sein, um diese Einstellung zu unterstützen. Bitte bringen Sie Ihren Browser auf den neuesten Stand für mehr Kontrolle über Ihre Daten.',
    },
};

/**
 * Return an array from nodes
 * @param selector
 */
function nodeArray(selector) {
    return [].slice.call(document.querySelectorAll(selector));
}

function setHtml(elements, language, key) {
    elements.forEach((element) => {
        element.innerHTML = LANG_SNIPPETS[language][key];
    });
}

/**
 * display the current status of the tracking (enabled or not)
 */
function matomoDisplayStatus() {
    nodeArray(BASE_SELECTOR + ' .js').forEach((element) => {
        element.style.display = 'inline';
    });
    nodeArray(BASE_SELECTOR + ' .nojs').forEach((element) => {
        element.style.display = 'none';
    });
    const TRACKING_VALUE = localStorage.getItem('matomoTrackingEnabled');
    const CHECKBOXES = nodeArray(BASE_SELECTOR + ' input[name="matomo-optout"]');

    const CHECKED = TRACKING_VALUE === 'true';
    const TEXT_KEY = CHECKED ? 'trackingActive' : 'trackingInActive';

    CHECKBOXES.forEach((checkbox) => {
        checkbox.checked = CHECKED;
    });
    for (let language in LANG_SNIPPETS) {
        const ELEMENTS = nodeArray(`${BASE_SELECTOR} label[for="matomo-optout-${language}"]`);
        setHtml(ELEMENTS, language, TEXT_KEY);
    }
}

/**
 * change the status of the tracking
 * called on checkbox click
 */
function matomoChangeStatus() {
    if (typeof Storage !== 'undefined') {
        localStorage.matomoTrackingEnabled =
            localStorage.getItem('matomoTrackingEnabled') === 'true' ? 'false' : 'true';
        matomoDisplayStatus();
    }
}

/**
 * Get the browser’s DoNotTrack setting
 * @var DO_NOT_TRACK boolean
 */
const DO_NOT_TRACK = (() => {
    const NAV = navigator;
    return (
        !!NAV.doNotTrack === 'yes' || NAV.doNotTrack === '1' || NAV.msDoNotTrack === '1' || window.doNotTrack === '1'
    );
})();

(() => {
    if (DO_NOT_TRACK && DO_NOT_TRACK_RESPECTED) {
        /**
         * if browser DoNotTrack setting is activated show doNotTrackActive text
         */
        for (let language in LANG_SNIPPETS) {
            const ELEMENTS = nodeArray(`${BASE_SELECTOR}[lang="${language}"]`);
            setHtml(ELEMENTS, language, 'doNotTrackActive');
        }
        return;
    }
    if (typeof Storage !== 'undefined') {
        /**
         * if localStorage exists show status text and set event listener to checkbox
         */
        matomoDisplayStatus();
        nodeArray(`input[name="matomo-optout"]`).forEach((input) => {
            input.addEventListener('change', matomoChangeStatus);
        });
        return;
    }
    for (let language in LANG_SNIPPETS) {
        const ELEMENTS = nodeArray(`${BASE_SELECTOR}[lang="${language}"]`);
        setHtml(ELEMENTS, language, 'localStorageNotAvailable');
    }
})();
