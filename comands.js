const Discord = require("discord.js");
const prefix = require("./config.json").prefix
// Команды //
async function help(robot, message , args) {
    var text = "Список доступных команд:\n";
    for (i in comands_list){
        text += prefix + comands_list[i].name + " - " + comands_list[i].about + "\n"
    }
    message.channel.send(text);
}
async function aboutself(robot, message , args) {
    message.channel.send("Я специализированный бот для сервера по игре Hackers\nМоя основная задача это осуществлять простые манипуляции с чатом и предоставлять данные об игре")
}
async function aboutcomponents(robot, message , args) {
    if (args.length > 1){
        if (args[1] == "-full" && args.length > 2){
            for (i in component_list){
                if (args[2] == component_list[i].name){
                    message.channel.send(component_list[i].name + ":\n" + component_list[i].aboutlong);
                    return;
                }
            }
            aboutcomponentswrong(message);
        } else {
            for (i in component_list){
                if (args[1] == component_list[i].name){
                    message.channel.send(component_list[i].name + ":\n" + component_list[i].aboutshort);
                    return;
                }
            }
            aboutcomponentswrong(message);
        }
    } else {
        aboutcomponentswrong(message);
    }
}
async function avaluablecomponents(robot, message , args){
    var text = "Теги компонентов:\n";
    for (i in component_list){
        text += component_list[i].name + "\n";
    }
    message.channel.send(text);
}
async function wiki(robot, message , args){
    if (args.length > 1){
        for (i in component_list){
            if (args[1] == component_list[i].name){
                const embeded = new Discord.MessageEmbed()
                    .setImage(component_list[i].icon)
                    .setTitle("статистика по компоненту: " + args[1])
                    .addFields(component_list[i].wikitable);
                message.channel.send({embeds: [embeded]});
                return;
            }
        }
    }
    aboutcomponentswrong(message);
}
async function newmember(robot, message , args){}
async function botrules(robot, message , args){}
async function rules(robot, message , args){}
 // Список комманд //
const comands_list = [
	{name: "help", out: help, about: "узнать команды бота"},
    {name: "aboutbot", out: aboutself, about: "узнать больше о боте"},
    {name: "component", out: aboutcomponents, about: "узнать детальную информацию о компоненте"},
    {name: "avaluablecomponents", out: avaluablecomponents, about: "узнать какие компоненты описаны и какие их теги"},
    {name: "wiki", out: wiki, about: "вывести статистику узла"},
    {name: "new", out: newmember, about: "команда в разработке"},
    {name: "botrules", out: botrules, about: "команда в разработке"},
    {name: "rules", out: rules, about: "команда в разработке"}
];
module.exports.comands_list = comands_list;
//список компонентов
const component_list = JSON.parse(require("fs").readFileSync("./json/wiki.json"));
//вспомогательные функции
function aboutcomponentswrong(message) {
    message.channel.send("команда требует аргумента, аргумент не указан или указан неверно\nдля изучения тегов компонентов введите: " + prefix + "avaluablecomponents");
}