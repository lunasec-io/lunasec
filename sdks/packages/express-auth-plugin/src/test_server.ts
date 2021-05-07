import express from 'express';
import cors from 'cors';
import {authPlugin} from "./index";

const app = express();
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
}))

authPlugin(app);

app.listen(3001, () => console.log('Example app is listening on port 3001.'));
