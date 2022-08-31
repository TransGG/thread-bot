const types = require('../../configs/types.json'); 

exports.run = async (client, interaction, options) => {

    let typeName = options[0].value;

    // Check if the type name is a valid type in types
    if(!types.tags.includes(typeName)) return interaction.reply({
        content: `Unable to find the type: \`${typeName}\`, please make sure not to enter a type outside of the provided list`,
        ephemeral: true,
    });

    // Check if there is a thread with this ID
    const threads = await client.findThreadByType(typeName);

    if(!threads) return interaction.reply({
        content: `Unable to find any threads with type:  \`${typeName}\``,
        ephemeral: true,
    });

    if(threads.length == 0) return interaction.reply({
        content: `Unable to find any threads with type:  \`${typeName}\`. There are no threads with this type yet.`,
        ephemeral: true,
    });

    return interaction.reply({
        content: `Found threads with the type: ${typeName}\n${threads.map(thread => `<#${thread.id}>`).join('\n')}`,
        ephemeral: true,
    });

}