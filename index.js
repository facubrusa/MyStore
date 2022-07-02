const express = require('express');
const routerApi = require('./routers');
const cors = require('cors');

const { logErrors, boomErrorHanlder, ormErrorHandler } = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const whitelist = ['http://localhost:3001/', 'http://localhost:8080', 'https://myapp.com.ar'];

const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not authorized'));
		}
	},
};

app.use(cors(corsOptions));

require('./utils/auth');

app.get('/',
    checkApiKey,
    (req, res) => {
    res.send('Home');
});

app.listen(port, () => {
    if(process.env.ENV === 'development') {
        console.log(`Running on port ${port}`);
    }
});

routerApi(app);

// Always put the middlewares after the router
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHanlder);
