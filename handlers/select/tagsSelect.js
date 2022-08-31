exports.run = async (client, interaction, options) => {

    // Update the tags and reply.
    const thread = await client.editThreadTypes(interaction.channel.id, interaction.channel.name, options);

    return interaction.reply({
        content: `Tags updated for ${interaction.channel.name}!\nNew Tags: ${options.map(tag => `\`${tag}\``).join(', ')}`,
        ephemeral: true,
    });


}