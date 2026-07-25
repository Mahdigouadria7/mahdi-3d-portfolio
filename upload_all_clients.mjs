import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: 'zu63qo7h',
  api_key: '848386478238113',
  api_secret: 'zDCBoWK18DQZ2cXlNJ8Kz_t-FOc',
  secure: true
});

const clients = [
  { name: 'Danone', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\Danone\\danone-seeklogo.png', id: 'danone' },
  { name: 'DanUp', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\danup.png', id: 'danup' },
  { name: 'DCroc', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\dcroc.png', id: 'dcroc' },
  { name: 'Délice Holding', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\delice-Holding.png', id: 'delice' },
  { name: 'Diari Express', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\Diari express.png', id: 'diari_express' },
  { name: 'Fourré', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\fourre.png', id: 'fourre' },
  { name: 'Jouda', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\jouda.png', id: 'jouda' },
  { name: 'Kairna', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\Kairna.png', id: 'kairna' },
  { name: 'Kif', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\kif.png', id: 'kif' },
  { name: 'Orange', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\orange.png', id: 'orange' },
  { name: 'Papillon', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\papillon.png', id: 'papillon' },
  { name: 'Samsung', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\Sams.png', id: 'samsung' },
  { name: 'Smile', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\smile.png', id: 'smile' },
  { name: 'UBCI', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\ubci.png', id: 'ubci' },
  { name: 'Yves Rocher', path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity\\scratch\\Mahdi 3d portfolio\\public\\models\\Clients\\yves-rocher-seeklogo.png', id: 'yves_rocher' },
];

async function run() {
  const uploaded = [];
  for (const client of clients) {
    try {
      const res = await cloudinary.uploader.upload(client.path, {
        folder: 'portfolio/clients',
        public_id: client.id,
        overwrite: true,
        invalidate: true,
      });
      console.log(`✅ Uploaded ${client.name}: ${res.secure_url}`);
      uploaded.push({ name: client.name, url: res.secure_url });
    } catch (err) {
      console.error(`Failed ${client.name}:`, err);
    }
  }
  console.log('\n--- UPLOAD SUMMARY ---');
  console.log(JSON.stringify(uploaded, null, 2));
}

run();
