const {getRedditPost, imageWH} = require("../funcs");

module.exports = {
    command: "meme",
    description: "Self Explanatory",
    executor: async () => {

        const subReddits = ["dankmeme", "meme", "me_irl"];
        let post = await getRedditPost(subReddits);
        let wh = await imageWH(post.url_overridden_by_dest)

        return {
            send: false,
            result: {
                title: post.title,
                color: 0x4B0082,
                image: {
                    url: post.url_overridden_by_dest,
                    width: wh.width,
                    height: wh.height
                },
                footer: {
                    text: `👍 ${post.ups} 💬 ${post.num_comments} - ${post.subreddit_name_prefixed}`
                }
            }
        }

    }
}