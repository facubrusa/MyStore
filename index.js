const express = require('express');
const routerApi = require('./routers');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHanlder } = require('./middlewares/error.handler');
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

app.get('/', (req, res) => {
    res.send('Home');
});

app.listen(port);

routerApi(app);

// Always put the middlewares after the router
app.use(logErrors);
app.use(boomErrorHanlder);
app.use(errorHandler);
