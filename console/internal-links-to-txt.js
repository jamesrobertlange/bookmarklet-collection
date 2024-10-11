let links = Array.from(document.querySelectorAll('a')).map(a => {
    let selector = a.closest('[class]') ? a.closest('[class]').getAttribute('class') : 'No specific class';
    return `${selector}: ${a.href}`;
});

let uniqueLinks = Array.from(new Set(links));
let date = new Date().toISOString().split('T')[0];
let content = `Extracted on ${date}\n\n${uniqueLinks.join('\n')}`;

let blob = new Blob([content], {type: 'text/plain'});
let a = document.createElement('a');
a.href = URL.createObjectURL(blob);
let cleanName = document.location.hostname.replace(/^www\./, '') + document.location.pathname.replace(/[^a-z0-9]/gi, '_');
a.download = `links_${cleanName}_${date}.txt`;
a.click();
URL.revokeObjectURL(a.href);
