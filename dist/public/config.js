//#  APP Configuration

//#  HOW TO USE
//#  set ENV variable

var ENV_ARR = ['development', 'production'];
var ENV = ENV_ARR[0];  //#  0 or 1

//#  default config is for development environment
var URLS = {
    api: {
        FETCH: '/api/v1/',
        CONFIG: {
            headers: {
                'Authorization': 'Basic ' + window.btoa('sammok:a123456..')
            }
        }
    },

    BASE: 'http://localhost:4000'
};

if (ENV == 'production') {
    URLS.BASE = 'http://120.26.48.94:4000';
}

