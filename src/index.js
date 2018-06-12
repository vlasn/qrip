#! /usr/bin/env node

const Q = require('qrcode-terminal')
const os = require('os')
const [,, ...args] = process.argv
const ngrok = require('ngrok')

const { opts, params } = args.reduce((a, arg) =>{
    a[arg.substring(0, 1) === '-' ? 'opts': 'params'].push(arg)
    return a
}, {opts: [], params: []})


if (params.length < 1) {
    console.error('Please specify port or run `qrip --h` for help')
} else if (opts.includes('--h') || opts.includes('--help')) {
    console.log(`
Usage:
    * \`qrip 4000\` to simply generate a QR code with your local network address + the specified port (400 in this case)
    * \`qrip 4000 /landing/hi\` to do the above and append \`/landing/hi\` to the URL.
    * \`qrip 4000 /landing/hi --ngrok\` will open an ngrok tunnel and create a QR link referring to that instead. This deprecates the limitation of needing to have both devices on the same network.
All other options you pass in will be lost in time, like tears in rain.
    `)
} else {

    const printQR = async (port, path, ngrokEnabled) => {
        const interfaces = os.networkInterfaces()
        const [{address: ip}] = Object.keys(interfaces)
            .reduce((a, v) => [...a, ...interfaces[v]], [])
            .filter(i => i.internal === false && i.family === 'IPv4')
        const url = ngrokEnabled 
            ? await ngrok.connect({addr: port, host_header: 'rewrite'})
            : `http://${ip}:${port + path}`
    
        console.log(`generating QR code for ${url} \n`)
        Q.generate(url)
        ngrokEnabled && console.log('\n Hit ctrl^C to kill the server')    
    }

    const [port, path = ''] = params
    console.log(opts)
    printQR(port, path, opts.includes('--ngrok'))
}

