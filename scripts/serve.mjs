import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.wav':'audio/wav','.zip':'application/zip','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}const target=path.resolve(root,'.'+name+(name.endsWith('/')?'index.html':''));if(!target.startsWith(root+path.sep)){res.writeHead(403).end();return}if(!fs.existsSync(target)||!fs.statSync(target).isFile()){res.writeHead(404).end('Not found');return}res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Content-Length':fs.statSync(target).size,'X-Content-Type-Options':'nosniff'});fs.createReadStream(target).pipe(res)});
server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${server.address().port}`));
