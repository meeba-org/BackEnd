/** An empty service worker! */
self.addEventListener('fetch', function(event) {
    /** An empty fetch handler! */
});

let deferredPrompt;

self.addEventListener('beforeinstallprompt', (e) => {
    console.log("beforeinstallprompt fired", e);
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    deferredPrompt.prompt();
});

self.addEventListener('appinstalled', (evt) => {
    console.log("appinstalled fired", evt);
});
