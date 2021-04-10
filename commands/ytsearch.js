const youtube = require('scrape-youtube').default;
const { choose } = require("../funcs");

module.exports = {
    command: "ytsearch",
    description: "Args: [playlist|live|video|creator]",
    executor: async (args) => {
        if (!args[0]) return
        let options = {
            "--playlist": "playlists",
            "--live": "streams",
            "--video": "videos"
        }

        let type = await choose(args, Object.keys(options), null)

        // Search youtube
        let res = await youtube.search(args.join(" "), {type: type.slice(2)}).then(yt => yt).then(res => res[options[type]])
        
        // Format the description
        let desc = []
        for (video of res.slice(0, 10)) {
            desc.push(`[${video.title}](${video.link})** >> **${video.channel.name}`)
        }

        // make the embed
        return {
            send: false,
            result: {
                type: "rich",
                title: `YouTube Search - ${args.join(" ")}`,
                color: 0x4B0082,
                description: desc.join("\n")
            }
        }

    }
}