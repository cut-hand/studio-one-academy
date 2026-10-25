import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'content/curriculum.json'),'utf8'));
assert.equal(data.length,5,'Need five levels');
const seen=new Set();let pointCount=0;
for(const stage of data){assert.equal(stage.lessons.length,6);for(const l of stage.lessons){assert(!seen.has(l.id),'Unique lesson IDs');seen.add(l.id);assert(/^[a-z0-9-]+$/.test(l.id));assert.equal(l.points.length,3);pointCount+=l.points.length;assert(l.checklist.length>=3);for(const p of l.points){for(const field of ['title','explanation','example','result','pitfall'])assert(typeof p[field]==='string'&&p[field].length>(field==='title'?1:5),`${l.id}: ${field}`);assert(p.steps.length>=3)}assert(fs.existsSync(path.join(root,`dist/assets/${l.asset}.zip`)));}}
new vm.Script(fs.readFileSync(path.join(root,'dist/app.js'),'utf8'));
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'dist/curriculum.js'),'utf8'),context);assert.equal(context.window.CURRICULUM.length,5);
const manifest=JSON.parse(fs.readFileSync(path.join(root,'dist/assets/manifest.json'),'utf8'));
for(const m of Object.values(manifest)){const bytes=fs.readFileSync(path.join(root,'dist',m.file));assert.equal(bytes.readUInt32LE(0),0x04034b50,'Valid ZIP header');assert(m.files.includes('README.txt'));}
for(const file of ['mix-preview.wav','rhythm-preview.wav']){const bytes=fs.readFileSync(path.join(root,'dist/assets',file));assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.readUInt32LE(24),44100);assert.equal(bytes.readUInt16LE(34),16);assert.equal(bytes.readUInt32LE(40)/2/44100,19.2);}
console.log(`PASS: ${seen.size} lessons, ${pointCount} cases, four ZIP packs, WAV format, JavaScript syntax, curriculum bundle.`);
