const colors = require('colors');
const types = require('../configs/types.json');

module.exports = async (client) => {
    console.log("--- Bot started | Registering Commands ---".rainbow);

    // let commands = await client.guilds.cache.get(process.env.GUILD).commands.fetch()
    // commands.forEach(command => {
    //     client.guilds.cache.get(process.env.GUILD).commands.delete(command.id)
    // })

    // return

    client.guilds.cache.get(process.env.GUILD).commands.create({
        name: "thread",
        description: "Thread Commands",
        options: [{
            name: "name-search",
            description: "Searches threads",
            type: 1,
            options: [{
                name: "name",
                description: "What is the name of the thread you would like to search for?",
                type: 3,
                required: true,
                autocomplete: true,
            }],
        }, {
            name: "tag-search",
            description: "Searches threads",
            type: 1,
            options: [{
                name: "tag",
                description: "What tag would you like to search for?",
                choices: types.tags.map(tag => {
                    return {
                        name: tag,
                        value: tag,
                    }
                }),
                type: 3,
                required: true
            }],
        }]
    })

    client.guilds.cache.get(process.env.GUILD).commands.create({
        name: "mod-threads",
        description: "Thread Commands",
        options: [{
            name: "tags",
            description: "Changes the current threads tags",
            type: 1,
        }]
    })
}