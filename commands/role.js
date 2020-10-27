module.exports = { 
    name: "role",
    execute: async (message, args, Discord, client, config) =>  {
        
       var member = client.users.cache.find(player => player.id = message.author.id);
       if(message.guild.id == "759093614852440207") return;    
       if(args[0] == "arch"){
            message.channel.send({embed: {title: "Gestionnaire de rôle", color: "0x89C4F9", description: "Bienvenue, et n'oublie pas ton yaourt !"}});  
            var  rank = await  message.guild.roles.cache.find(r => r.name === "btw i use arch");
            message.member.guild.roles.add(rank);
       }else if(args[0] == "debian" || "ubuntu" ){
            message.channel.send({embed: {title: "Gestionnaire de rôle", color: "0x89C4F9", description: "Donne moi ton apt ou je te fume!"}});   
            var  rank = await  message.guild.roles.cache.find(r => r.name === "debian user");
            message.member.guild.roles.add(rank);
       }else if(args[0] == "khel"  || "fedora" || "centos" ){
            message.channel.send({embed: {title: "Gestionnaire de rôle", color: "0x89C4F9", description: "Récupère ton chapeau, sale manchot!"}});   
            var  rank = await  message.guild.roles.cache.find(r => r.name === "khel");
            message.member.guild.roles.add(rank);
       }else if(args[0] == "android") {
            message.channel.send({embed: {title: "Gestionnaire de rôle", color: "0x89C4F9", description: "Fait gaffe Google t'écoute!"}});   
            var  rank = await  message.guild.roles.cache.find(r => r.name === "android user");
            message.member.guild.roles.add(rank); 
       }else if(args[0] == "freebsd" || "bsd"){
            message.channel.send({embed: {title: "Gestionnaire de rôle", color: "0x89C4F9", description: "Bienvenue dans la confrérie du FSF"}});   
            var  rank = await  message.guild.roles.cache.find(r => r.name === "bsd");
            message.member.guild.roles.add(rank); 
       }else{
        }
    }
}
