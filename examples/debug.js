const { get } = require('../dist/request.handler');
const fs = require('fs');

async function debugDecode() {
    const latitude = -6.170131;
    const longitude = 106.8241607;
    const language = 'en';
    
    console.log(`Fetching data for coordinates: ${latitude}, ${longitude}`);
    
    const googleResponse = await get(`https://www.google.com/maps/search/?api=1&hl=${language}&query=${latitude}%2C${longitude}`);
    
    // Save the response to a file for inspection
    fs.writeFileSync('google_response.html', googleResponse);
    console.log('Response saved to google_response.html');
    
    // Check if the response contains the expected strings
    console.log(`Response contains coordinates: ${googleResponse.includes(`${latitude},${longitude}`)}`);
    console.log(`Response contains APP_OPTIONS: ${googleResponse.includes("window.APP_OPTIONS=")}`);
    
    // Try to extract the data using the same logic as in the decode function
    const finalFiltered = googleResponse.split("\n")
        .filter((item) => item.includes(`${latitude},${longitude}`))
        .filter((item) => item.includes("window.APP_OPTIONS="));
    
    console.log(`Number of matching lines: ${finalFiltered.length}`);
    
    if (finalFiltered.length > 0) {
        console.log('First few characters of the matching line:');
        console.log(finalFiltered[0].substring(0, 100));
    }
}

debugDecode().catch(console.error); 