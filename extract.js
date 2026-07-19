const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

ffmpeg.setFfmpegPath(ffmpegPath);

const videoPath = path.join(__dirname, 'public', 'models', 'Man_with_glowing_eyes_202607151730.mp4');
const framesDir = path.join(__dirname, 'public', 'models', 'Man_with_glowing_eyes_frames');

if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
}

console.log('Extracting frames to WebP...');

ffmpeg(videoPath)
    .on('end', () => {
        console.log(`Successfully extracted frames to WebP!`);
    })
    .on('error', (err) => {
        console.error('Error extracting frames:', err);
    })
    .outputOptions([
        '-r 24', // Output at 24fps
        '-q:v 15', // High JPG compression (lower is better quality in ffmpeg, but 15 is highly compressed yet decent)
        '-vf scale=1280:-2' // Scale to 720p width
    ])
    .save(path.join(framesDir, 'frame_%05d.jpg'));
