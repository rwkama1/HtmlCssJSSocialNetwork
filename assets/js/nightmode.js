(function (window, document, undefined) {
    'use strict';
    if (!('sessionStorage' in window)) return;
    var nightMode = sessionStorage.getItem('gmtNightMode');
    if (nightMode) {
        document.documentElement.className += ' night-mode';
    }
})(window, document);

(function (window, document, undefined) {

    'use strict';

    // Feature test
    if (!('sessionStorage' in window)) return;

    // Get our newly insert toggle
    var nightMode = document.querySelector('#night-mode');
    if (!nightMode) return;

    // When clicked, toggle night mode on or off
    nightMode.addEventListener('click', function (event) {
        event.preventDefault();
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            sessionStorage.setItem('gmtNightMode', true);
            return;
        }
        sessionStorage.removeItem('gmtNightMode');
    }, false);

})(window, document);