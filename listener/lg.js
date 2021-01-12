module.exports = client => {
    
    //Le joueur ciblé  pour être tué
    client.votePlayerToKill = async(message, timer) => {
    }
    //Le joueur ciblé par les LG
    client.votePlayerLG = async(LG) => {
        
    }
    //Le joueur ciblé par la Sorcière
    client.voteWizard = async(member, players) => {
        member.send({embed: {title: "Sauvez ou Prendre une vie", color: "PINK",
            description: "Utilisez la potion de vie :green_heart:, mort:black_heart:, rien faire :x:"}}).then(message => {
            message.react("💚");
            message.react("🖤")
            message.react("❌");
  
            client.on('messageReactionAdd', function(reaction, user) {
                if(user.id == client.user.id) return;
                if(reaction.emoji.name == "❌"){
                   return member.send("C'est donc ça la méditation :thinking:");
                }else if(reaction.emoji.name == "🖤"){
                    var embedTokill = new DiscordEmbed({title: "Tuer...", description: "Vous êtes sur le point de tuer une personne..."});
                    players.forEach(function(key, id) { 
                        embedToKill.addField(key, "<@" + id + ">");
                    });

                }else if(reaction.emoji.name == "💚"){
                   var embedToSave = new DiscordEmbed({title: "Sauver...", description: "Vous êtes sur le point de sauver une personne..."});
                }
            })
        });
    }
    //Le joueur ou la voyante veut voir le rôle
    client.voteVoyant = async(member, players) => {
        member.send({title: ":eye: - Quel joueur voulez-vous, observez ?", color: "RED", 
        description:"Votre don de voyante vous donne la chance d'observer des gens :eyes:"}).then(message => {
                
            })
    }
    //Le vote pour le maire
    client.voteMaire = async(channel, members) => {
        var embedMaire = new Discord.MessageEmbed({title: "La DEMO-QUOI?! LA DEMOCRATIE!", color: "YELLOW",
        description: "La démocratie... mieux vaut une bonne vielle terreur à la Robespierre, ouais !"});
        players.forEach((key, id)=> { 
            embedToKill.addField(key, "<@" + id + ">");
        });
        channel.send("Qui voulez-vous, voter pour qu'il devienne maire ? ", embedMaire).then(message => {
            for(var key in Object.keys(members)){
                message.react(keys);
            }

        });
    }
    //Le joueur a tué si le vote a été null
    client.voteMaireToKill = async(maire, playersToKill) => {
    }
}
