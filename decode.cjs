const fs = require('fs');
const s = fs.readFileSync('.tmp_full.html','utf8');
const start = s.indexOf('srcdoc=');
if(start === -1) { console.log('no'); process.exit(); }
let i = start + 8;
if(s[i] !== '"') { console.log('q'); process.exit(); }
i++;
let out = '';
while(i < s.length) {
  const c = s[i];
  if(c === '"' && s[i-1].charCodeAt(0) !== 92) break;
  if(s.substr(i,6) === '&quot;') { out += '"'; i += 6; continue; }
  if(s.substr(i,5) === '&amp;') { out += '&'; i += 5; continue; }
  if(s.substr(i,5) === '&#39;') { out += "'"; i += 5; continue; }
  if(s.substr(i,4) === '&lt;') { out += '<'; i += 4; continue; }
  if(s.substr(i,4) === '&gt;') { out += '>'; i += 4; continue; }
  if(s.substr(i,6) === '&#x27;') { out += "'"; i += 6; continue; }
  out += c;
  i++;
}
fs.writeFileSync('.tmp_srcdoc_decoded.html', out);
console.log('ok');
