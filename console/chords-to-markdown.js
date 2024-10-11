function getCleanFileName(url) {
    let cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/[/?#]/g, '_');
    let date = new Date().toISOString().split('T')[0];
    return `${cleanUrl}_${date}.md`;
}

function isChordLine(line) {
    let chordPattern = /^[A-G](#|b)?m?(aj|dim|aug|sus)?[2-9]?(\(.*?\))?(\+\d+)?(\*)?$/;
    let words = line.split(/\s+/);
    return (words.length > 0 && words.some(word => chordPattern.test(word) || word === '/' || /^x\d+$/.test(word))) || !line.match(/[a-z]{3,}/i);
}

function getPageContent() {
    let titleElement = document.querySelector('.ryCTx.FiAaP');
    let title = titleElement.querySelector('h1').textContent.trim();
    let artist = titleElement.querySelector('a').textContent.trim();
    let content = `# ${title}\n\n`;
    let rawContent = document.querySelector('.P8ReX').innerText;
    let lines = rawContent.split('\n');
    lines.forEach(line => {
        let trimmedLine = line.trim();
        if (trimmedLine.match(/^\[.*\]$/)) {
            content += `## ${trimmedLine.slice(1, -1)}\n`;
        } else if (isChordLine(trimmedLine)) {
            content += `### ${trimmedLine}\n`;
        } else if (trimmedLine) {
            content += `${trimmedLine}\n`;
        } else {
            content += '\n';
        }
    });
    return content;
}

function downloadFile(content, fileName, type) {
    let blob = new Blob([content], {type: type});
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

let content = getPageContent();
let fileName = getCleanFileName(window.location.href);
downloadFile(content, fileName, "text/markdown;charset=utf-8");
