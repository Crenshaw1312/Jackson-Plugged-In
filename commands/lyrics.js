const got = require('got');
const { getSong, imageWH } = require("../funcs");

module.exports = {
    command: "lyrics",
    description: "Usage: <name> <artist>",
    executor: async (args, main) => {

        if (!args[0]) return

        // get first result data
        let data = await getSong(args.join(" "))
        let url = data.album_coverart_500x500 || data.album_coverart_350x350 || data.album_coverart_100x100
        let wh = await imageWH(url)

        // Get lyrics
        let res = await got(data.track_share_url.split("?utm")[0]).then(res => res.body)
        let lyrics = res.split('<p class="mxm-lyrics__content "><span class="lyrics__content__')[1].split("</span>")[0].split(">")[1].replace("...", "") + "\n" + res.split('</div></div><p class="mxm-lyrics__content "><span class="lyrics__content__')[1].split("</span>")[0].split(">")[1]


        // Shorten if too long
        if (lyrics.length < 2040) {
            lyrics = lyrics.slice(0, 2040) + "..."
        }

        return {
            send: false,
            result: {
                type: "rich",
                title: `Lyrics - ${data.track_name}\nBy: ${data.artist_name}`,
                color: 0x4B0082,
                description: lyrics,
                thumbnail: {
                    url: url,
                    width: wh.width,
                    height: wh.height
                }
            }
        }

    }
}