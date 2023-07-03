const { google } = require('googleapis');

const scopes = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file'
];

export default async function messageHandler(req, res) {
    const { method } = req;
    const id = req.query.id[0];

    switch(method) {
        case 'GET':
            const auth = new google.auth.JWT(
                process.env.GD_CLIENT_EMAIL, null,
                process.env.GD_PRIVATE_KEY, scopes
            );
            const drive = google.drive({ version: "v3", auth });
        
            await drive.files.get({ fileId: id, alt: 'media' }, { responseType: 'stream' }, function(err, { data }) {
                if(err) res.status(503).end(`API error: ${err}`);
                let buf = [];
                data.on('data', function(e) {
                    buf.push(e);
                });
                data.on('end', function(e) {
                    const buffer = Buffer.concat(buf);
                    res.status(200).end(buffer);
                });
            });
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} not allowed`);
            break;
    }

    return new Promise(resolve => {
        return resolve();
    });
}
