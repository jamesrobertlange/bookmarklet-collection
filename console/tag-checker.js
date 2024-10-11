function checkTags() {
    let results = [];
    let botifyScript = document.querySelector('script[src*="activation.js"]');
    let gtmPresent = !!window.google_tag_manager;
    let tealiumPresent = !!window.utag;

    results.push(`Botify script tag present: ${!!botifyScript}`);
    results.push(`Google Tag Manager present: ${gtmPresent}`);
    results.push(`Tealium present: ${tealiumPresent}`);

    let objectNames = ["Botify", "BotifyActivation", "_botify"];
    objectNames.forEach(name => {
        results.push(`Global object "${name}" present: ${!!window[name]}`);
    });

    let botifyScriptLoaded = performance.getEntriesByType("resource")
        .filter(entry => entry.name.includes("activation.js"));
    results.push(`Botify script loaded: ${botifyScriptLoaded.length > 0}`);

    let botifyElements = document.querySelectorAll("[data-botify]");
    results.push(`Elements with Botify data attributes: ${botifyElements.length}`);

    let allScripts = Array.from(document.scripts).map(script => ({
        src: script.src,
        async: script.async,
        defer: script.defer,
        type: script.type
    }));

    let networkScripts = performance.getEntriesByType("resource")
        .filter(entry => entry.initiatorType === "script");

    let botifyNetworkScripts = networkScripts.filter(script => 
        script.name.includes("activation.js") || script.name.toLowerCase().includes("botify")
    );

    let date = new Date();
    let dateString = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    let pageName = window.location.hostname + window.location.pathname.replace(/[^a-z0-9]/gi, "-");

    let jsonData = {
        results: results,
        allScripts: allScripts,
        networkScripts: networkScripts,
        botifyScripts: botifyNetworkScripts
    };

    let jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {type: "application/json"});
    let jsonLink = document.createElement("a");
    jsonLink.href = URL.createObjectURL(jsonBlob);
    jsonLink.download = `tag-audit-${pageName}-${dateString}.json`;
    jsonLink.click();
    URL.revokeObjectURL(jsonLink.href);

    let csvContent = "Name,Start Time,Duration,Initiator Type,Delivery Type,Next Hop Protocol,Render Blocking Status,Worker Start,Redirect Start,Redirect End,Fetch Start,Domain Lookup Start,Domain Lookup End,Connect Start,Secure Connection Start,Connect End,Request Start,Response Start,First Interim Response Start,Response End,Transfer Size,Encoded Body Size,Decoded Body Size,Response Status\n" +
        botifyNetworkScripts.map(script => 
            `"${script.name}",${script.startTime},${script.duration},"${script.initiatorType}","${script.deliveryType}","${script.nextHopProtocol}","${script.renderBlockingStatus}",${script.workerStart},${script.redirectStart},${script.redirectEnd},${script.fetchStart},${script.domainLookupStart},${script.domainLookupEnd},${script.connectStart},${script.secureConnectionStart},${script.connectEnd},${script.requestStart},${script.responseStart},${script.firstInterimResponseStart},${script.responseEnd},${script.transferSize},${script.encodedBodySize},${script.decodedBodySize},${script.responseStatus}`
        ).join("\n");

    let csvBlob = new Blob([csvContent], {type: "text/csv"});
    let csvLink = document.createElement("a");
    csvLink.href = URL.createObjectURL(csvBlob);
    csvLink.download = `botify-scripts-${pageName}-${dateString}.csv`;
    csvLink.click();
    URL.revokeObjectURL(csvLink.href);

    alert(results.join("\n"));
}

checkTags();
