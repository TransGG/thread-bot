const {
    EmbedBuilder,
} = require('discord.js');


module.exports = client => {

    client.updateThreadsEmbed = async () => {

        // Get all the threads
        const threads = await client.getAllThreads();

        if (!threads) return

        let sorts = [{
                name: "\_\_--===Top Of All Time===--\_\_ 🚀",
                data: threads.sort((a, b) => {
                    return b.total - a.total;
                }).slice(0, 5)
            },
            {
                name: "\_\_--===Top This Week===--\_\_ 📅",
                data: threads.sort((a, b) => {
                    return b.weekly - a.weekly;
                }).slice(0, 5)
            },
            {
                name: "\_\_--===Recently Created===--\_\_ 🆕",
                data: threads.sort((a, b) => {
                    return b.created - a.created;
                }).slice(0, 5)
            },
            {
                name: "\_\_--===3 Random Threads===--\_\_ 👀",
                data: threads.sort(() => {
                    return 0.5 - Math.random();
                }).slice(0, 3)
            }
        ]

        let channel = client.channels.cache.get(process.env.CHANNEL)

        let messages = await channel.messages.fetch({
            limit: 10
        })

        let messageNum = 0

        if (messages.size > 0) {
            messages.forEach(message => {
                if (message.author.id == client.user.id) {
                    // console.log(sorts.length - (messageNum + 1))

                    // console.log(sorts)
                    message.edit({
                        content: `***${sorts[sorts.length - (messageNum + 1)].name}***\n\n${sorts[sorts.length - (messageNum + 1)].data.map(thread => {
                                return `<#${thread.id}>\n*Last Active* <t:${Math.floor(thread.lastActive/1000)}:R>\`\`\`Total Messages: ${thread.total}\nMessages This Week: ${thread.total}\nTags: ${thread.types.join(", ")}\`\`\``
                            }).join("\n")}\n** **`
                    })
                    messageNum++
                }
            })
        } else {
            sorts.forEach(sort => {
                channel.send({
                    content: `***${sorts[messageNum].name}***\n\n${sorts[messageNum].data.map(thread => {
                            return `<#${thread.id}>\n*Last Active* <t:${Math.floor(thread.lastActive/1000)}:R>\`\`\`Total Messages: ${thread.total}\nMessages This Week: ${thread.total}\nTags: ${thread.types.join(", ")}\`\`\``
                        }).join("\n")}\n** **`
                })
                messageNum++
            })
        }


        // if (messages.size > 0 ) {
        //     return messages.first().edit({
        //         content: sorts.map(sort => {
        //             return `***${sort.name}***\n${sort.data.map(thread => {
        //                     // return `<#${thread.id}>\n***Last Active*** <t:${Math.floor(thread.lastActive/1000)}:R>\`\`\`Total Messages: ${thread.total}\nMessages This Week: ${thread.total}\nTags: ${thread.types.join(", ")}\`\`\``
        //                     // return `<#${thread.id}> | ***Last Active*** <t:${Math.floor(thread.lastActive/1000)}:R> | Total Messages: ${thread.total}\`\`\`Tags: ${thread.types.join(", ")}\`\`\``

        //                     // return `<#${thread.id}> | \`${thread.total}\` Total Messages | Last Active <t:${Math.floor(thread.lastActive/1000)}:R>`
        //                 }).join("\n")}`
        //         }).join("\n\n"),
        //         // embeds: sorts.map(sort => {
        //         //     return new EmbedBuilder()
        //         //         .setTitle(`***${sort.name}***`)
        //         //         .setDescription(sort.data.map(thread => {
        //         // return `<#${thread.id}>\n***Last Active*** <t:${Math.floor(thread.lastActive/1000)}:R>\`\`\`Total Messages: ${thread.total}\nMessages This Week: ${thread.total}\nTags: ${thread.types.join(", ")}\`\`\``
        //         // return `<#${thread.id}> | ***Last Active*** <t:${Math.floor(thread.lastActive/1000)}:R> | Total Messages: ${thread.total}\`\`\`Tags: ${thread.types.join(", ")}\`\`\``

        //         // return `<#${thread.id}> | \`${thread.total}\` Total Messages | Last Active <t:${Math.floor(thread.lastActive/1000)}:R>`
        //         //         }).join("\n"))
        //         //         .setColor("0x5376e0")
        //         // })
        //     })
        // } else {
        //     return channel.send({
        //         content: sorts.map(sort => {
        //             return `***${sort.name}***\n${sort.data.map(thread => {
        //                     // return `<#${thread.id}>\n***Last Active*** <t:${Math.floor(thread.lastActive/1000)}:R>\`\`\`Total Messages: ${thread.total}\nMessages This Week: ${thread.total}\nTags: ${thread.types.join(", ")}\`\`\``
        //                     // return `<#${thread.id}> | ***Last Active*** <t:${Math.floor(thread.lastActive/1000)}:R> | Total Messages: ${thread.total}\`\`\`Tags: ${thread.types.join(", ")}\`\`\``

        //                     // return `<#${thread.id}> | \`${thread.total}\` Total Messages | Last Active <t:${Math.floor(thread.lastActive/1000)}:R>`
        //                 }).join("\n")}`
        //         }).join("\n\n"),
        //         // embeds: sorts.map(sort => {
        //         //     return new EmbedBuilder()
        //         //         .setTitle(`***${sort.name}***`)
        //         //         .setDescription(sort.data.map(thread => {
        //         //             return `<#${thread.id}> | ${thread.total} Total Messages, Last Active <t:${Math.floor(thread.lastActive/1000)}:R> `
        //         //         }).join("\n"))
        //         //         .setColor("0x5376e0")
        //         // })
        //     })
        // }

    }
}