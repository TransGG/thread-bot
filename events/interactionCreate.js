const Fuse = require('fuse.js')

module.exports = async (client, interaction) => {

    if (interaction.isChatInputCommand()) {
        const slash = client.slash.get(interaction.options._subcommand)
        if (!slash) return;
        slash.run(client, interaction, interaction.options._hoistedOptions);
    } else if (interaction.type == 3) {
        const select = client.select.get(interaction.customId)
        if (!select) return;
        else select.run(client, interaction, interaction.values);
    } else if (interaction.type === 4) {


        const threadFuse = new Fuse(await client.getAllThreads(), {
            keys: ["name"]
        });

        let choices = threadFuse.search(interaction.options.getFocused())

        await interaction.respond(
            choices.map(option => ({
                name: option.item.name,
                value: option.item.id
            })),
        );
    }

}