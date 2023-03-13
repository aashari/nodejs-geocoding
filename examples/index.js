const geocoding = require('@aashari/nodejs-geocoding');

geocoding.decode(-6.170131, 106.8241607).then(result => {
    console.log(result);
    /*{
        latitude: -6.170131,
        longitude: 106.8241607,
        formatted_address: 'Jl. Medan Merdeka Utara No.3, RT.2/RW.3, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110',
        google_plus_code: 'RRHF+WMV Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta'
    }*/
});

geocoding.encode("jalan merdeka utara no.3 jakarta").then(result => {
    console.log(result);
    /*[
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
    ]*/
});

geocoding.encode("jalan merdeka utara no.3 jakarta", "id").then(result => {
    console.log(result);
    /*[
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
    ]*/
});
