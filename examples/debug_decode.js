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
        
        // Try to extract the APP_INITIALIZATION_STATE
        if (googleResponse.includes("window.APP_INITIALIZATION_STATE=")) {
            console.log('Found APP_INITIALIZATION_STATE');
            
            const appInitStateLines = googleResponse.split("\n")
                .filter(line => line.includes("window.APP_INITIALIZATION_STATE="));
            
            if (appInitStateLines.length > 0) {
                console.log('First few characters of APP_INITIALIZATION_STATE:');
                console.log(appInitStateLines[0].substring(0, 100));
                
                // Try to extract the formatted address from APP_INITIALIZATION_STATE
                try {
                    const appInitState = appInitStateLines[0].split("window.APP_INITIALIZATION_STATE=")[1].split(";window.APP_FLAGS=")[0];
                    console.log('Extracted APP_INITIALIZATION_STATE, first 100 chars:');
                    console.log(appInitState.substring(0, 100));
                    
                    // Look for formatted address patterns in the response
                    const addressPatterns = googleResponse.match(/"formatted_address":"([^"]+)"/g);
                    if (addressPatterns && addressPatterns.length > 0) {
                        console.log('Found formatted_address patterns:');
                        addressPatterns.forEach(pattern => {
                            console.log(pattern);
                        });
                    } else {
                        console.log('No formatted_address patterns found');
                    }
                    
                    // Look for any address-like strings
                    const possibleAddresses = googleResponse.match(/Jalan[^"<>]+/g);
                    if (possibleAddresses && possibleAddresses.length > 0) {
                        console.log('Found possible address strings:');
                        possibleAddresses.forEach(addr => {
                            console.log(addr);
                        });
                    } else {
                        console.log('No possible address strings found');
                    }
                    
                    // Look for Google Plus Code patterns
                    const plusCodePatterns = googleResponse.match(/[A-Z0-9]{4}\+[A-Z0-9]{2,3}\s[^"<>]+/g);
                    if (plusCodePatterns && plusCodePatterns.length > 0) {
                        console.log('Found possible Google Plus Code patterns:');
                        plusCodePatterns.forEach(code => {
                            console.log(code);
                        });
                    } else {
                        console.log('No Google Plus Code patterns found');
                    }
                    
                    // Look for any meta tags with location information
                    const metaTags = googleResponse.match(/<meta[^>]*content=['"](.*?)['"][^>]*>/g);
                    if (metaTags && metaTags.length > 0) {
                        console.log('Found meta tags:');
                        metaTags.forEach(tag => {
                            if (tag.includes('°') || tag.includes('latitude') || tag.includes('longitude') || tag.includes('address')) {
                                console.log(tag);
                            }
                        });
                    } else {
                        console.log('No relevant meta tags found');
                    }
                    
                    // Look for any JSON data in the response
                    const jsonBlocks = googleResponse.match(/\[\[[^\]]+\]\]/g);
                    if (jsonBlocks && jsonBlocks.length > 0) {
                        console.log('Found JSON blocks:');
                        jsonBlocks.slice(0, 3).forEach(block => {
                            console.log(block.substring(0, 100) + '...');
                        });
                    } else {
                        console.log('No JSON blocks found');
                    }
                } catch (error) {
                    console.error('Error parsing APP_INITIALIZATION_STATE:', error);
                }
            }
        }
    }
}

debugDecode().catch(console.error); 