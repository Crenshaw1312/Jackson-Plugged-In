const { get } = require('powercord/http');
const {imageWH} = require("../funcs");

module.exports = {
    command: "animal",
    description: "Usage: [fox|panda|koala|cat|dog|bird] [image]",
    executor: async (args, main) => {
            // setup
    let options = ["fox", "cat", "koala", "panda", "bird", "dog"]
    let option = false;
    let type = "facts";

    // get an option
    for (let arg of args) {
        if (options.includes(arg)) {
            option = arg;
            break
        }
    }
    if (!option) option = options[Math.floor(Math.random() * options.length)];
    if (args.includes("image") || args.includes("img")) type = "img";

    // get the animal
    const res = await get(`https://some-random-api.ml/${type}/${option}`);
    let animal = res.body.fact || res.body.link;

    // make the embed
    let embed = {
        type: 'rich',
        title: `${option[0].toUpperCase() + option.slice(1).toLowerCase()}`,
        color: 0x4B0082,
    }
    // Image
    if (args.includes("image") || args.includes("img")) {
        let wh = await imageWH(animal)
        embed.image = {
            url: animal,
            width: wh.width,
            height: wh.height
        }

    // Plain text
    } else {
        embed.description = animal;
    }

    return {
        send: false,
        result: embed
    }
    }

}
