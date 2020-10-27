const marked = require("marked");
const fs = require('fs')
const helpMd = fs.readFileSync('./text/help.md', 'utf-8').split("[split]");


module.exports = { 
    name: "help",
    execute(message, args, Discord, client, config) {
      var em = new Discord.MessageEmbed({title:"Commande Tuxbot", color:"0x89C4F9"})
      var page = 1;
       
      if(args[0] == null){
           page = 1;
      }else{
           page = args[0];
      }
      em.setDescription(helpMd[page-1])
      message.channel.send("Page =" + page + "/" + helpMd.length,em)
    }
}
