import express from 'express';
import {authPlugin} from "./index";

const app = express();

authPlugin(app);

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
