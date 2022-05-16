const twilio = require('twilio')
const accountSid = 'AC33630fd76eb219c5d519973ae212803f'
const authToken = 'a58c42bb5b6f395417eb83b5dddc14a1'

const client = twilio(accountSid, authToken)
async function trilio(){
    try {
        const message = await client.messages.create({
            body: 'CON ESA DELANTERA GANAMOS EN QATAR Y LA COPA AMERICA',
            from: '+17853908705',
            to: '+541121819062'
        })
        console.log(message)
     } catch (error) {
        console.log(error)
     }
}


trilio()
 