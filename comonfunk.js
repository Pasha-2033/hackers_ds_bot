async function replayornot(message, robot){
    if (message.content.includes("link.hackersthegame.com/view_replay.php?")){
        var msgchanel = robot.channels.cache.find(channel => channel.id === "874041389502046273");
        console.log(msgchanel.id);
        if (message.channel != msgchanel) msgchanel.send(message);
    }
}
async function checkmessageviolations(message, guild){
    for (i in forbiden){
        if (message.content.toLowerCase().includes(forbiden[i].word)){
            const role = guild.roles.cache.find(role => role.id === "880025266477486140");
            message.channel.send(message.author.username + " выражайся культурно! Через час продолжишь!")
            message.member.roles.add(role);
            message.delete();
            let t = setTimeout(removerole, 1000 * 60 * 60, message.member, role);
            return;
        }
    }
}
function removerole(member, role){
    member.roles.remove(role);
}
const forbiden = JSON.parse(require("fs").readFileSync("./json/forbiden.json"));
module.exports.replayornot = replayornot;
module.exports.checkmessageviolations = checkmessageviolations;