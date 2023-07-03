const { google } = require('googleapis');

const scopes = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file'
];

export const getImages = async () => {
    let imageArray = [];

    const auth = new google.auth.JWT(
        process.env.GD_CLIENT_EMAIL, null,
        process.env.GD_PRIVATE_KEY, scopes
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