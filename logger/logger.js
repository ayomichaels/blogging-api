const {transports, format} = require('winston')

const {createLogger} = require('winston')



const logger = createLogger({
    transports: [
        new transports.File({
            level: 'info',
            filename: '.logs/appication.log'
        }),
        new transports.Console()
    ],

    format: format.combine(
        format.json(),
        format.timestamp(),
        format.metadata(),
        format.prettyPrint()
        
    ),
    

    exitOnError: false
})

module.exports = logger