(function(){javascript:(function(){function e(){return Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(e=>e.textContent).join("\n\n")}function t(){return Array.from(document.querySelectorAll("[itemscope]")).map(e=>Array.from(e.querySelectorAll("[itemprop]")).map(e=>`${e.getAttribute("itemprop")}: ${e.textContent.trim()}`).join("\n")).join("\n\n")}function n(e){return e.replace(/^(https?:\/\/)?(www\.)?/,"").replace(/[^a-z0-9]/gi,"_").toLowerCase()}const o=e(),r=t(),c=`JSON-LD:\n${o}\n\nMicrodata:\n${r}`,a=n(window.location.hostname+window.location.pathname),i=new Date().toISOString().split("T")[0],l=`${a}_${i}.txt`,s=new Blob([c],{type:"text/plain"}),p=document.createElement("a");p.href=URL.createObjectURL(s),p.download=l,p.click(),URL.revokeObjectURL(p.href)})();})();
