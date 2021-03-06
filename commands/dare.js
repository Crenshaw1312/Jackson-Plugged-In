const { get } = require('powercord/http');
const { choose } = require("../funcs");

module.exports = {
    command: "dare",
    description: "Allowed Args: [r|pg13|pg]",
    executor: async (args) => {

        let rating = await choose(args, ["pg", "pg13", "r"], null);
        let question = await get(`https://api.truthordarebot.xyz/dare?rating=${rating}`)
        question = question.body.question

        return {
            send: false,
            result: {
                title: "Dare",
                color: 0x4B0082,
                description: question,
                footer: {
                    text: `Rating: ${rating}`
                }
            }
        }
        
    }
}