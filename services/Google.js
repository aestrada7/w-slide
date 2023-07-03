const { google } = require('googleapis');
const credentials = require('../credentials.json');

const scopes = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file'
];

export const getImages = async () => {
    let imageArray = [];

    const auth = new google.auth.JWT(
        credentials.client_email, null,
        credentials.private_key, scopes
    );
    const drive = google.drive({ version: "v3", auth });

    const files = await drive.files.list({});
    if (files.data.files) {
        files.data.files.map((file) => {
            imageArray.push(`./api/gdImage/${file.id}`)
        });
    }

    return imageArray;
};