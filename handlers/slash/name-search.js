
exports.run = async (client, interaction, options) => {

    let threadId = options[0].value;

    // Check if there is a thread with this ID
    const thread = await client.findThread(threadId);

    if(!thread) return interaction.reply({
        content: `Unable to find thread with ID:  \`${threadId}\``,
        ephemeral: true,
    });

    return interaction.reply({
        content: `Thread found! Jump to thread: <#${threadId}>`,
        ephemeral: true,
    });

}