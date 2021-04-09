const got = require('got');

// Error
exports.error = async (error) => {
    return {
        send: false,
        result: {
            title: "Error",
            color: 0x4B0082,
            description: error
        }
    }
}

// Random unless in args
exports.choose = async (args, options, not) => {
    let choice = options[Math.floor(Math.random() * options.length)];
    if (!args)
        return choice;
    for (let option of options) {
        if (args.find(arg => option == arg && not !== arg))
            choice = option;
    }
    return choice;
}

// Reddit
exports.getRedditPost = async (subReddits) => {
    try {
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        let res = "";
        let response = await got(`https://www.reddit.com/r/${random}/random/.json`)
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;
        return post.data
    } catch (error) {
        return
    }
}

// Image width + Height
exports.imageWH = async (url) => {
    let res;
    await new Promise(resolve => {
        let img = new Image();
        img.src = url;
        img.onload = function() {
            res = {width: this.width, height: this.height}
          resolve()
        }
    })
    return res
}