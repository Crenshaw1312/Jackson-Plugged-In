const { get } = require('powercord/http');
const { choose } = require("../funcs");

module.exports = {
    command: "wyr",
    description: "Allowed Args: [r|pg13|pg]",
    executor: async (args, main) => {

        let rating = await choose(args, ["pg", "pg13", "r"], null);
        let question = await get(`https://api.truthordarebot.xyz/wyr?rating=${rating}`)
        question = question.body.question

        return {
            send: false,
            result: {
                title: "Would you Rather",
                color: 0x4B0082,
                description: question,
                footer: {
                    text: `Rating: ${rating}`
                }
            }
        }
        
    }
}