(function() {
    function getJumpLinks() {
        let links = document.querySelectorAll('a[href^="#"]');
        let jumpLinks = [];
        
        links.forEach(link => {
            let href = link.getAttribute("href");
            let id = href.substring(1);
            let targetElement = document.getElementById(id);
            
            jumpLinks.push({
                href: href,
                text: link.textContent.trim() || "[No Text]",
                valid: href === "#" || !!targetElement
            });
        });
        
        return jumpLinks;
    }

    function displayAndCopyResults(jumpLinks) {
        let message = "All Jump Links:\n\n";
        
        jumpLinks.forEach(link => {
            let status = link.valid ? "Valid" : "Broken";
            message += `${link.href} (${link.text}) - ${status}\n`;
        });
        
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

    let jumpLinks = getJumpLinks();
    displayAndCopyResults(jumpLinks);
})();
