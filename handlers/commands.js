const { readdirSync } = require("fs");

let current = 0

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                current = current + 1
                console.log('Command file "' + file + '" successfully noded (' + current + '/45)')
                console.log("------------------------------------------------------------------------")
            } else {
                current = current + 1
                console.log('Command file "' + file + '" failed to node (' + current + '/45)')
                console.log("------------------------------------------------------------------------")
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
}
