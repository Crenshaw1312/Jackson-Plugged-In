const youtube = require('scrape-youtube').default
const { get } = require('powercord/http');
const querystring = require("querystring");

module.exports = {
    command: "songav",
    description: "Results: All platforms, linked, to where the song is available",
    executor: async (args, main) => {
        if (!args[0]) return

        // search youtube
        let res = await youtube.search(args.join(" "))
        // search song.link
        res = querystring.stringify({url: res.videos[0].link})
        res = await get(`https://api.song.link/v1-alpha.1/links?${res}`)
        res = res.body

        let plats = ["Available Platforms"]
        let platforms = Object.keys(res.linksByPlatform)
        console.log(platforms)
        let data = (res.entitiesByUniqueId[res.entityUniqueId])

        for (plat of platforms) { 
            let base = res.linksByPlatform[plat]
            plats.push(`[${plat}](${base.url})`)
        }

        return {
            send: false,
            result: {
                type: "rich",
                title: (data.title + "\nBy: " + data.artist),
                url: res.pageUrl,
                color: 0x4B0082,
                description: plats.join("\n")
            }
        }

    }
}