/** An empty service worker! */
// eslint-disable-next-line no-unused-vars
self.addEventListener('fetch', function(event) {
    /** An empty fetch handler! */
});

let deferredPrompt;

self.addEventListener('beforeinstallprompt', (e) => {
    // eslint-disable-next-line no-console
    console.log("beforeinstallprompt fired", e);
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    deferredPrompt.prompt();
});

self.addEventListener('appinstalled', (evt) => {
    // eslint-disable-next-line no-console
    console.log("appinstalled fired", evt);
});
