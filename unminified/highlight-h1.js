(function() {
    function cleanFileName(t) {
        return t.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    }

    function getVisibleText(node, isRoot = false) {
        let text = '';
        if (node.nodeType === Node.TEXT_NODE) {
            text = node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE && 
                   window.getComputedStyle(node).display !== 'none' && 
                   window.getComputedStyle(node).visibility !== 'hidden') {
            let tagName = node.tagName.toLowerCase();
            if (/^h[1-6]$/.test(tagName) && !isRoot) {
                let level = tagName.charAt(1);
                text += '#'.repeat(level) + ' ';
            } else if (tagName === 'pre' && node.querySelector('code')) {
                let code = node.querySelector('code');
                let language = code.className.replace('language-', '').replace('lang-', '');
                text += '\n```' + language + '\n' + code.textContent.trim() + '\n```\n\n';
            }
            for (let child of node.childNodes) {
                text += getVisibleText(child);
            }
        }
        return text;
    }

    function getSelectedTextAndAllSubsequentContent() {
        var selection = window.getSelection();
        if (selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);
            var selectedText = range.toString().trim();
            var body = document.body;
            var allContent = getVisibleText(body, true);
            var startIndex = allContent.indexOf(selectedText);
            if (startIndex !== -1) {
                var subsequentContent = allContent.substring(startIndex + selectedText.length);
                return '# ' + selectedText + '\n\n' + subsequentContent.trim();
            }
        }
        return null;
    }

    function htmlToMarkdown(text) {
        let lines = text.split(/\r?\n/);
        let markdown = '';
        let inCodeBlock = false;
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            if (line.startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                markdown += line + '\n';
                continue;
            }
            if (inCodeBlock) {
                markdown += line + '\n';
            } else if (line) {
                markdown += line + '\n';
            } else if (i > 0 && lines[i-1].trim()) {
                markdown += '\n';
            }
        }
        return markdown.trim();
    }

    let content = getSelectedTextAndAllSubsequentContent();
    if (content) {
        let markdown = htmlToMarkdown(content);
        let title = document.title || 'Untitled';
        let date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        let fileName = date + '_' + cleanFileName(title) + '.md';
        let blob = new Blob([markdown], {type: 'text/markdown;charset=utf-8'});
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    } else {
        alert('Please select the text for the H1 before using this bookmarklet.');
    }
})();
