
## Demo

## Resources:

## Tech stack

- HTML / CSS
- (Vanilla) JavaScript
- DeviceOrientation Web API
- Three.js
- Node.js w/ socket.io

## Current commands

After opening the link on mobile, place the phone on a skateboard and start tilting it from left to right to avoid obstacles.

There is no particular goal or point system at the moment.

## Running locally

After cloning this repo, run `node server.js`, open your browser and visit `localhost:3000`.

To be able to visit the mobile page, you'll probably need something like [ngrok](https://ngrok.com/).

Once you have ngrok installed, you'll need to run `./ngrok http 3000` and, using the urls it will give you, visit `/mobile`.
