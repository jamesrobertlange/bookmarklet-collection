(function() {
    function getJSONLD() {
        return Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
            .map(script => script.textContent)
            .join("\n\n");
    }

    function getMicrodata() {
        return Array.from(document.querySelectorAll("[itemscope]"))
            .map(item => 
                Array.from(item.querySelectorAll("[itemprop]"))
                    .map(prop => `${prop.getAttribute("itemprop")}: ${prop.textContent.trim()}`)
                    .join("\n")
            )
            .join("\n\n");
    }

    function cleanFileName(name) {
        return name.replace(/^(https?:\/\/)?(www\.)?/, "")
                   .replace(/[^a-z0-9]/gi, "_")
                   .toLowerCase();
    }

    const jsonLDContent = getJSONLD();
    const microdataContent = getMicrodata();
    const combinedContent = `JSON-LD:\n${jsonLDContent}\n\nMicrodata:\n${microdataContent}`;

    const cleanName = cleanFileName(window.location.hostname + window.location.pathname);
    const date = new Date().toISOString().split("T")[0];
    const fileName = `${cleanName}_${date}.txt`;

    const blob = new Blob([combinedContent], {type: "text/plain"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
})();
