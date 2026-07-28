import fs from 'fs';

const pdfBuffer = fs.readFileSync('public/cv.pdf');
const content = pdfBuffer.toString('binary');

// Extract readable ASCII strings from PDF binary stream
const strings = content.match(/[\x20-\x7E\s]{3,}/g) || [];
const cleanLines = strings
    .map(s => s.trim())
    .filter(s => s.length > 2 && !s.startsWith('/') && !s.startsWith('<<') && !s.startsWith('obj') && !s.includes('endobj'));

console.log(cleanLines.join('\n'));
