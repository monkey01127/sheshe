/*require.config({
    paths: {
        'geoJson': '../geoData/geoJson',
        'theme': '../theme',
        'data': './data',
        'map': '../map',
        'extension': '../extension'
    },
    packages: [
        {
            main: 'echarts',
            location: '../src',
            name: 'echarts'
        },
        {
            main: 'zrender',
            location: '../../zrender/src',
            name: 'zrender'
        }
    ]
    // urlArgs: '_v_=' + +new Date()
});*/
require.config({
            packages: [
                {
                    name: 'echarts',
                    location: 'js/echarts',
                    main: 'echarts'
                },
                {
                    name: 'zrender',
                    location: 'js/zrender',
                    main: 'zrender'
                }
            ]
        });