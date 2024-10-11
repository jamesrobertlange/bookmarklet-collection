function getCleanFileName(url) {
    let cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/[/?#]/g, '_');
    return `${cleanUrl}_${new Date().toISOString().split('T')[0]}.md`;
}

function getPageContent() {
    return document.body.innerText;
}

function downloadFile(content, fileName) {
    let blob = new Blob([content], {type: "text/markdown;charset=utf-8"});
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
downloadFile(content, fileName);
