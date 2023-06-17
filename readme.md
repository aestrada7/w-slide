# W-Slide

A simple image slider that mimics Windows 8+ lockscreens. Creates a mosaic of images with a slight animation, then moves on to the next one.
It's intended to be used as a photo reel on tablets.

## Running

1. Clone the repository.
2. Add images to the `public/temp` folder.
3. Run the Next.js app locally using `npm run dev`.
4. Using the device the reel will be displayed navigate to the server's IP in port `3000`. (e.g. `192.168.0.19:3000`)

There's a Vercel integration in development, ideally this would mean grabbing images from OneDrive, Google Drive or Vercel Blob.

## Options

There's a low memory option for older Android tablets that can't handle image preloading or some basic computation, to use it
navigate to the same URL but add the `lowmem` query parameter and set it to `true` (e.g. `192.168.0.19:3000/?lowmem=true`)

## Known Bugs / Upcoming Features

### As of version 0.0.8
* If images are particularly large, the animation might play with the same image that was already loaded and then abruptly change.
* The `lowmem` option was added as a patch since low powered devices can't handle the memory output of loading multiple images at the same time.
* Vercel integration and ability to use cloud based folders instead of local folders is upcoming.