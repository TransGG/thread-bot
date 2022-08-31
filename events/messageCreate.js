const checks = require(`../configs/checks.json`);

module.exports = async (client, message) => {
    if (message.author.bot) return;

    if (message.channel.type === 11) {
        if (checks.allowedChannels.includes(message.channel.parentId)) {
            client.incrementThread(message.channel.id, message.channel.name)
            client.updateThreadsEmbed()
        }
    }
}