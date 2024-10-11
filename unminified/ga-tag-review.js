(function() {
    function getGACodes() {
        let codes = [];
        
        if (typeof ga !== "undefined") {
            ga(function() {
                ga.getAll().forEach(function(tracker) {
                    codes.push("UA: " + tracker.get("trackingId"));
                });
            });
        }
        
        if (typeof gtag !== "undefined") {
            Object.keys(window).filter(key => key.startsWith("gtag_")).forEach(function(key) {
                codes.push("GA4: " + key.split("_")[1]);
            });
        }
        
        if (typeof google_tag_manager !== "undefined") {
            Object.keys(google_tag_manager).forEach(function(key) {
                if (key.startsWith("GT")) {
                    codes.push("GTM: " + key);
                }
            });
        }
        
        if (typeof dataLayer !== "undefined" && dataLayer.length > 0) {
            dataLayer.forEach(function(item) {
                if (item[0] === "config" && item[1].startsWith("G-")) {
                    codes.push("GA4 (dataLayer): " + item[1]);
                }
            });
        }
        
        return codes;
    }

    function displayAndCopyResults() {
        let codes = getGACodes();
        let message = codes.length > 0 ? 
            "Google Analytics Codes found:\n\n" + codes.join("\n") : 
            "No Google Analytics codes found. The site might be using a different analytics solution or the GA code hasn't loaded yet.";
        
        alert(message);
        
        let textarea = document.createElement("textarea");
        textarea.value = message;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        
        console.log(message);
        console.log("Results copied to clipboard!");
    }

    displayAndCopyResults();
})();
