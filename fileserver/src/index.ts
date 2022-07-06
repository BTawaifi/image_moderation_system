import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import path from 'path';
import { downloadImage, storeStream } from './storageFunctions';
const app = express();

const PORT = process.env['FILESERVER_LOCAL_PORT'] || 8080;

app.use(cors({ "origin": "*" }))
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }))

app.post('/images', express.json(), ImageStorageMiddleware)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../' + req.path));
});

app.listen(PORT, () => { console.log('File server listening on port ' + PORT); });


async function ImageStorageMiddleware(req: Request, res: Response, _next: NextFunction) {
    if (req.body?.imageUrl) {
        res.send(await downloadImage(req.body.imageUrl, req.body.userId))
    }
    else if (req.body?.byteStream) {
        res.send(await storeStream(req.body.byteStream, req.body.userId))
    }
    else {
        res.status(400).send()
    }
}