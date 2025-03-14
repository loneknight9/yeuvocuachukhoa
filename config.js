const config = {
    development: {
        apiUrl: 'http://localhost:6969'
    },
    production: {
        apiUrl: 'https://yeuvocuachukhoa-be.onrender.com'
    }
};

export const API_URL = config[process.env.NODE_ENV || 'development'].apiUrl; 