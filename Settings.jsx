const { React } = require('powercord/webpack');
const { TextInput, SwitchItem } = require('powercord/components/settings');

module.exports = ({ getSetting, updateSetting, toggleSetting }) => (
  <div>
    <SwitchItem
      note='Show the upvote count and subreddit the post is from'
      value={getSetting('showRedditData', true)}
      onChange={() => toggleSetting('showRedditData')}
    >
      Show Reddit Post Info
    </SwitchItem>
  </div>
);
