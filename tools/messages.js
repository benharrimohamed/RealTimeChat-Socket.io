const moment = require ('moment')

function MessageFormat (username , text )
{
   return {
       username,
       text,
       time: moment().format('h:mm a')
   }

}

module.exports = MessageFormat;