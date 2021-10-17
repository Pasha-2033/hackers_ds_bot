const Discord = require("discord.js");
const robot = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const comands_list = require("./comands.js").comands_list;
const fs = require("fs"); // Подключаем родной модуль файловой системы node.js  
const config = require("./config.json");
const comonfunk = require("./comonfunk.js");
var guild;
robot.login(config.token);
robot.on("ready", function(){
	
	//console.log(JSON.parse(fs.readFileSync("./json/wiki.json")));

    console.log("Загрузка успешна, функционирую исправно");
	console.log("Ссылка для добавлние на сервер: https://discord.com/api/oauth2/authorize?client_id=878677821260722247&permissions=0&scope=bot")
	guild = robot.guilds.cache.get("864873656434163732");
	robot.user.setPresence({
        game: {
            name: '/help',
            type: "STREAMING",
        }
    });
	console.log(guild.roles.cache);
});
robot.on("messageCreate", msg => {
	comonfunk.checkmessageviolations(msg, guild);
	if(msg.author.username != robot.user.username && msg.author.discriminator != robot.user.discriminator){
		comonfunk.replayornot(msg, robot);
    	var comm = msg.content.trim()+" ";
	    var comm_name = comm.slice(0, comm.indexOf(" "));
	    var messArr = comm.split(" ");
	    for(i in comands_list){
	    	var comm2 = config.prefix + comands_list[i].name;
	    	if(comm2 == comm_name){
	    		comands_list[i].out(robot, msg, messArr);
				return;
	    	}
	    }
    }
});
/*robot.on("guildMemberAdd", member => {
	member.roles.add(guild.roles.cache.find(role => role.id === "864878017096450110"));
	guild.channels.cache.find(channel => channel.id === "864873656911790080").send({embed: {
		color: 3447003,
		description: "Привет " + member.nickname + "!\nЕсли хочешь краткий экскурс по серверу - напечатай /new",
		timestamp: new Date(),
	}});
});*/