import { createRoutes } from './routes';
import express, {Request} from "express";
import cors from "cors";
import { SecretProviders, LunaSecExpressAuthPlugin, LunaSecTokenAuthService} from '@lunasec/node-sdk';


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST']
}));

const tokenService = new LunaSecTokenAuthService({
    secretProvider: {
        type: SecretProviders.environment,
    }
});

const authPlugin = new LunaSecExpressAuthPlugin({
    tokenService: tokenService,
    authContextCallback: (req: Request) => {
        const idToken = req.cookies['id_token'];

        if (idToken === undefined) {
            console.error('id_token is not set in request');
            return null;
        }
        // TODO (cthompson) validate the jwt and pull relevant claims from payload
        return {};
    }
});

authPlugin.register(app);

app.use(createRoutes(tokenService))

app.listen(3001, () => {
    console.log('listening on http://localhost:3001/');
});
