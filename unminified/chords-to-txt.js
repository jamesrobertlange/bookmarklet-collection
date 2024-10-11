(function() {
    let t = document.querySelector('h1.dUjZr').textContent.trim(),
        a = document.querySelector('h1.dUjZr+span a').textContent.trim(),
        c = document.querySelector('.tK8GG'),
        h = c.innerHTML.replace(/<span[^>]*data-name="([^"]*)"[^>]*>[^<]*<\/span>/g, function(m, chord) {
            return chord.padEnd(chord.length + 1);
        }).replace(/<br>/g, '\n').replace(/<[^>]*>/g, '').replace(/X$/, ''),
        f = t + '\n\n' + h,
        b = new Blob([f], {type: 'text/plain'}),
        d = document.createElement('a');
    d.href = URL.createObjectURL(b);
    d.download = a + ' - ' + t + '.txt';
    d.click();
})();
