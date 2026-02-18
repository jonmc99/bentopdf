// tracking.js

// -------------------------------------------------------------------
// 1. STANDARD CLARITY TRACKING (Client-Side)
// -------------------------------------------------------------------
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "vje7jjg9ap"); 

// -------------------------------------------------------------------
// 2. AZURE STATIC WEB APPS IDENTITY LOGIC
// -------------------------------------------------------------------
window.addEventListener('load', async function() {
    try {
        const response = await fetch('/.auth/me');
        if (!response.ok) return;

        const payload = await response.json();
        const { clientPrincipal } = payload;

        if (clientPrincipal && window.clarity) {
            const userEmail = clientPrincipal.userDetails;
            window.clarity("identify", userEmail, { 
                "User Email": userEmail, 
                "Auth Provider": clientPrincipal.identityProvider
            });
            console.log("Clarity tracking identified: " + userEmail);
        }
    } catch (error) {
        console.debug("Clarity identity check failed.");
    }
});

// -------------------------------------------------------------------
// 3. UNBLOCKABLE SERVER TRACKING (Application Insights)
// -------------------------------------------------------------------
// This bypasses ad blockers by sending a request to YOUR own API ('/api/ping'),
// which Azure logs on the server side.

function sendServerPing() {
    // We send a lightweight request to the API we created.
    // Ad blockers typically allow this because it looks like a normal site function.
    fetch('/api/ping')
        .then(() => console.debug("Server tracking ping sent."))
        .catch(e => console.debug("Server tracking ping failed", e));
}

// Trigger 1: On Initial Page Load
window.addEventListener('load', sendServerPing);

// Trigger 2: On SPA Navigation (For BentoPDF)
// Since BentoPDF doesn't reload the page when switching tools, 
// we watch for URL changes using a MutationObserver.
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    sendServerPing(); // Fire a new ping because the user changed tools
  }
}).observe(document, {subtree: true, childList: true});
