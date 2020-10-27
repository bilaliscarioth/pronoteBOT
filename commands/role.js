const marked = require("marked");
const fs = require('fs')
const rolesMd = fs.readFileSync('./text/roles.md', 'utf-8');


module.exports = { 
    name: "role",
    execute(message, args, Discord, client, config) {
       var em = new Discord.MessageEmbed({title:"Gestionnaire de rôle", color:"0x89C4F9"})
       var member = client.users.cache.find(player => player.id = message.author.id);
       

       if(message.guild.id != "759093614852440207") return;    
       if(args[0] == null){
            console.log("test");
            em.setDescription(rolesMd);
       } 
       if(args[0] == "arch"){
            em.setDescription("> How un ArchLinuxien, c'est bon les ``yaourt`` ? " +
                              "<:hap:354275645574086656>");
            var  rank = message.guild.roles.cache.find(r => r.name === "btw i use arch");
            message.member.guild.roles.add(rank);
       }else if(args[0] == "debian"){
            em.setDescription("> Un utilisateur de Debian, encore et encore ! ");
            var  rank = message.guild.roles.cache.find(r => r.name === "debian user");
            message.member.guild.roles.add(rank);
       }else if(args[0] == "khel"){
            em.setDescription("> Mais en voila un qui porte des chapeaux");
            var  rank = message.guild.roles.cache.find(r => r.name === "khel");
            message.member.guild.roles.add(rank);
       }else if(args[0] == "android") {
            em.setDescription(">Oh, un utilisateur d'Android, prêt"+
                              " à exterminer la race iOS, WP ! :smiling_imp:");
            var  rank = message.guild.roles.cache.find(r => r.name === "android user");
            message.member.guild.roles.add(rank); 
       }else if(args[0] == "bsd"){
            em.setDescription("> Quelqu'un sous BSD, Au moins il n'a pas besoin" +
                              "de mettre GNUi devant son OS à chaque fois :d");
            var  rank = message.guild.roles.cache.find(r => r.name === "bsd");
            message.member.guild.roles.add(rank); 
       }
       message.channel.send(em);
    }
}
