(function() {
    var h = document.documentElement.outerHTML;
    var t = document.createElement('textarea');
    t.value = '<!DOCTYPE html>\n' + h;
    document.body.appendChild(t);
    t.select();
    try {
        var s = document.execCommand('copy');
        var m = s ? 'successful' : 'unsuccessful';
        console.log('Copying HTML was ' + m);
    } catch (e) {
        console.error('Unable to copy HTML: ', e);
    }
    document.body.removeChild(t);
    alert('Full HTML has been copied to the clipboard! (' + h.length + ' characters)');
})();
