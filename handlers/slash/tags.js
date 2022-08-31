const {
    ActionRowBuilder,
    SelectMenuBuilder,
} = require('discord.js');

const types = require(`../../configs/types.json`)
const checks = require(`../../configs/checks.json`)

exports.run = async (client, interaction, options) => {

    console.log(1)

    if (interaction.user.bot) return;

    if (interaction.channel.type === 11) {
        if (checks.allowedChannels.includes(interaction.channel.parentId)) {

            // Check the current thread's types
            const thread = await client.manageThread(interaction.channel.id, interaction.channel.name);

            const row = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                    .setCustomId('tagsSelect')
                    .setPlaceholder('Select Thread Tags')
                    .setMinValues(1)
                    .setMaxValues(types.tags.length)
                    .addOptions(types.tags.map(tag => {
                        if (thread.types.includes(tag)) return {
                            label: tag,
                            value: tag,
                            default: true,
                        }
                        else return {
                            label: tag,
                            value: tag,
                        }
                    })),
                );

            return interaction.reply({
                content: 'Please select the tags you want to add to this thread.',
                components: [row],
                ephemeral: true,
            });
        } else {
            return interaction.reply({
                content: 'This command can only be used in the following channels:\n' + checks.allowedChannels.map(channel => `<#${channel}>`).join(', '),
                ephemeral: true,
            });
        }
    } else {
        return interaction.reply({
            content: 'This command can only be used inside of a thread.',
            ephemeral: true,
        });
    }



}