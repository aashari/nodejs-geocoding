# @aashari/nodejs-geocoding

A NodeJS library that can encode and decode geolocation information. This library allows you to convert latitude and longitude to formatted addresses or formatted addresses to latitude and longitude.

> ⚠️⚠️⚠️ Please note that this library is not intended for commercial use. Please use the official Google Maps API instead.

### Installation
To install @aashari/nodejs-geocoding, use one of the following commands:


via yarn:

```
yarn add @aashari/nodejs-geocoding
```

via npm:

```
npm i @aashari/nodejs-geocoding
```

### Usage

#### Decode Latitude and Longitude

##### Example Code
```javascript
// importing the dependency
const geocoding = require('@aashari/nodejs-geocoding');

// decode latitude and longitude to formatted address
geocoding.decode(-6.170131, 106.8241607).then(result => {
    console.log(result);
});
```

##### Expected Output
```
{
    latitude: -6.170131,
    longitude: 106.8241607,
    formatted_address: 'Jl. Medan Merdeka Utara No.3, RT.2/RW.3, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110',
    google_plus_code: 'RRHF+WMV Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta'
}
```

#### Encode Formatted Address

##### Example Code (default language: en)
```javascript
// importing the dependency
const geocoding = require('@aashari/nodejs-geocoding');

// encode formatted address to latitude and longitude
geocoding.encode("jalan merdeka utara no.3 jakarta").then(result => {
    console.log(result);
});
```

##### Expected Output
```
[
    {
        formatted_address: 'Jalan Medan Merdeka Utara No.3, RT.3/RW.2, Gambir, Central Jakarta City, Jakarta',
        latitude: -6.1715111,
        longitude: 106.8269598
    },
    {
        formatted_address: 'Jalan Medan Merdeka Utara, RT.3/RW.2, Gambir, Central Jakarta City, Jakarta',
        latitude: -6.1715111,
        longitude: 106.8269598
    }
]
```

##### Example Code (custom language: id)
```javascript
// importing the dependency
const geocoding = require('@aashari/nodejs-geocoding');

// encode formatted address to latitude and longitude
geocoding.encode("jalan merdeka utara no.3 jakarta", "id").then(result => {
    console.log(result);
});
```

##### Expected Output
```
[
    {
        latitude: -6.175308299999999,
        longitude: 106.8281502,
        formatted_address: 'Jalan Medan Merdeka Utara No.3, RT.3/RW.2, Gambir, Kota Jakarta Pusat, Jakarta'
    },
    {
        latitude: -6.1714815,
        longitude: 106.8269598,
        formatted_address: 'Jalan Medan Merdeka Utara, RT.3/RW.2, Gambir, Kota Jakarta Pusat, Jakarta'
    }
]
```
