# W-Slide

A simple image slider that mimics Windows 8+ lockscreens. Creates a mosaic of images with a slight animation, then moves on to the next one.
It's intended to be used as a photo reel on tablets.

## Setup

1. Clone the repository.
2. Add images to the `public/temp` folder.
3. Run the Next.js app locally using `npm run dev`.
4. Using the device the reel will be displayed navigate to the server's IP in port `3000`. (e.g. `192.168.0.19:3000`)

Further integrations will come in the future, ideally with Vercel Blob.

### Environment Variables
Environment variables that are used by the application are the following:
`DEPLOYMENT`: either `LOCAL` or `VERCEL`, if using `LOCAL` it will use the filesystem's `public/temp` folder to show images, if using `VERCEL`,
it will attempt to connect to a Cloud based solution to retrieve images from.

### Google Drive Integration
Current integration grabs images from Google Drive. In order to set this up:

1. Create a folder in your Google Drive that will hold all the pictures on the reel
2. Create a Service Account within the Google Cloud Console
3. Ensure the folder that was created is shared with the service account that was just created
4. Create a Key for the Service Account in JSON format and download it
5. Rename it as `credentials.json` and place it at the root of the repository
6. Upload it manually to your Vercel project

## Options

There's a low memory option for older Android tablets that can't handle image preloading or some basic computation, to use it
navigate to the same URL but add the `lowmem` query parameter and set it to `true` (e.g. `192.168.0.19:3000/?lowmem=true`)

## Known Bugs / Upcoming Features

### As of version 0.1.0
* If images are particularly large, the animation might play with the same image that was already loaded and then abruptly change.
* The `lowmem` option was added as a patch since low powered devices can't handle the memory output of loading multiple images at the same time.