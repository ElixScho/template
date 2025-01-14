const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');

// Create images directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

// Function to download and optimize image
async function downloadAndOptimizeImage(url, filename) {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer',
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        });

        // Process image with Sharp
        await sharp(response.data)
            .resize(1920, 1080, { // Resize to standard size
                fit: 'cover',
                position: 'center'
            })
            .webp({ // Convert to WebP with good quality/size balance
                quality: 80,
                effort: 6, // Higher effort = better compression but slower
                smartSubsample: true,
                nearLossless: false
            })
            .toFile(filename);

        return true;
    } catch (error) {
        console.error(`Error processing ${filename}:`, error.message);
        return false;
    }
}

// Download and optimize images
async function downloadImages() {
    const width = 1920;
    const height = 1080;
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < 100; i++) {
        const filename = path.join(imagesDir, `bg-${i}.webp`); // Using .webp extension
        const url = `https://picsum.photos/${width}/${height}`;
        
        console.log(`Processing image ${i + 1}/100...`);
        try {
            const success = await downloadAndOptimizeImage(url, filename);
            if (success) {
                successCount++;
                console.log(`✓ Successfully processed image ${i + 1}`);
            } else {
                failCount++;
                console.log(`✗ Failed to process image ${i + 1}`);
            }
            // Add a delay between downloads
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
            failCount++;
            console.error(`Error downloading image ${i}:`, error);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    console.log(`\nDownload complete!`);
    console.log(`Successfully processed: ${successCount} images`);
    console.log(`Failed: ${failCount} images`);
}

// Install required dependencies
const { execSync } = require('child_process');
try {
    console.log('Installing required dependencies...');
    execSync('npm install sharp axios', { stdio: 'inherit' });
    
    console.log('Starting download and optimization...');
    downloadImages().then(() => {
        console.log('Process completed!');
    }).catch(console.error);
} catch (error) {
    console.error('Failed to install dependencies:', error);
}
