const {getRedditPost} = require("../funcs");

module.exports = {
    command: "joke",
    description: "Self Explanatory",
    executor: async (args, main) => {

        const subReddits = ["jokes", "dadjokes", "antijokes", "meanjokes"]
        let post = await getRedditPost(subReddits);

        let footer;
        if (main.settings.get('showRedditData')) footer = {text: `👍 ${post.ups} 💬 ${post.num_comments} - ${post.subreddit_name_prefixed}`}

        return {
            send: false,
            result: {
                type: "rich",
                title: post.title,
                color: 0x4B0082,
                description: `||${post.selftext} ||`,
                footer: footer
            }
        }

    }
}