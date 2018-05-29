# qrip

A very simple cross-platform command line utility to help make trying out locally hosted (web) applications on mobile phones easier
[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://forthebadge.com)
### Use case
Ever developed a mobile-friendly/mobile-first website in the browser and wanted to check out how it looks in an _actual_ mobile phone?
Sure, you could host it in the cloud, but that is significant overhead.
Sure, you could run `ipconfig` to find out your network IP, only to type it into the phone manually.


As most modern phones are perfectly capable of scanning QR codes and opening links encoded in QR, why not make life a bit easier for yourself?

### Installation
*   clone this repository
*   `npm install && npm link`
And...Well, that's pretty much it, granted you have a modern version of Node and NPM installed.

### Usage
`qrip 4000` to create a QR code with your local ip with `:4000` appended to it.
`qrip 4000 /cats/666` to create a qr code similar to the above, except with an excplicitly set path.