// tracking.js

// 1. Standard Clarity Tracking Code
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "vje7jjg9ap"); // <--- Don't forget your Project ID here!

// 2. Azure Static Web Apps Identity Logic
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
