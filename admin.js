const KEY='shubhamTechWebsiteData';
const D=window.ST_DATA.defaults;
let data={...D};
const arrFields=['servicesList','solutionsList','equipmentList'];
function load(){try{const saved=JSON.parse(localStorage.getItem(KEY)||'{}');data={...D,...saved};arrFields.forEach(k=>{if(!Array.isArray(data[k]))data[k]=D[k]});}catch(e){data={...D}};Object.keys(data).forEach(k=>{const e=document.getElementById(k);if(e)e.value=Array.isArray(data[k])?data[k].join('\n'):data[k]});}
function saveData(){Object.keys(data).forEach(k=>{const e=document.getElementById(k);if(e)data[k]=arrFields.includes(k)?e.value.split('\n').map(x=>x.trim()).filter(Boolean):e.value});localStorage.setItem(KEY,JSON.stringify(data));window.ST_DATA.save(data);document.querySelectorAll('.status').forEach(x=>x.textContent='✓ Saved');setTimeout(()=>document.querySelectorAll('.status').forEach(x=>x.textContent=''),1800)}
function exportData(){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='shubham-tech-website-data.json';a.click();URL.revokeObjectURL(a.href)}
function importData(file){const r=new FileReader();r.onload=()=>{try{data={...D,...JSON.parse(r.result)};localStorage.setItem(KEY,JSON.stringify(data));load();alert('Website data imported successfully.');}catch(e){alert('Invalid JSON file.')}};r.readAsText(file)}
function resetData(){if(confirm('Reset all editable website content to default?')){localStorage.removeItem(KEY);load();window.ST_DATA.render();}}
document.querySelectorAll('.nav button').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));btn.classList.add('active');document.getElementById(btn.dataset.tab).classList.add('active')});
load();
