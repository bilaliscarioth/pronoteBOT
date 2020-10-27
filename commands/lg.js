const marked = require("marked");
const fs = require('fs')
const helpMd = fs.readFileSync('./text/help.md', 'utf-8').split("[split]");


module.exports = { 
    name: "lg",
    execute: async (message, args, Discord, client, config) => {
      var em = new Discord.MessageEmbed({title:"LoupGarou (version Discord)", color:"#0x89C4F9"})
      var emError = new Discord.MessageEmbed({title: "Erreur... LoupGarou", color: "RED" });
      const channel = client.channels.cache.find(c => c.name == "Salon");
      var logChannel = client.channels.cache.find(c => c.name == "log");
      switch(args[0]){
            case "--start":
                    /*
                     * @Pour vérifier qu'aucune autre partie se créer lorsqu'une partie commence;
                     */
                    if(client.partyCreate) return message.channel.send(emError.setDescription("Vous devez attendre"+
                    "la fin de l'autre partie avant d'en créer une autre... Système automatisé pour bientôt"))
                    
                    em.setDescription("Lancement de la partie loup-garou"); 
                    client.creatorID = message.author.id;
                    client.partyCreate = true; 
                     if (!channel) return console.error("Le channel n'a pas été trouvée");
         
                     /*
                      *Musique d'attente
                     */

                    channel.join().then(connection => {
                        if(client.debugLog) logChannel.send("Connexion au salon " + channel.name);
                        const ytdl = require('ytdl-core');
                        connection.play(ytdl('https://www.youtube.com/watch?v=HRuSPibNRl4', { filter: 'audioonly' }));    
                    }).catch(e => { console.error(e); });   
                    break;
            case "--debug-dev":
                    if(!client.debugLog){
                        client.debugLog = true;
                       em.setDescription("[Mode] Debug activé !");
                    }else{
                        client.debugLog = true; 
                        em.setDescription("[Mode debug désactivé");
                    }
                    return message.channel.send(em);
                    break;
            case "--stop":
                    em.setDescription("Arrêt de la partie...");
                    break
            case "--force-stop":
                    em.setDescription("Arrêt de la partie...");
                    client.partyCreate = false;
                    break
            case "--compo":
                    break
            default:
                    em.setDescription(helpMd[2]);
                    break;
        }
    
    await message.channel.send(em);
    /*
    * Lancement de la partie
    */
    var maxPlayers = 6;
    if(client.debugLog) maxPlayers = 1;
    setInterval(function(){ 
            var dplayer = 0;
            channel.members.forEach(member => {
                    if(member.id != client.user.id) dplayer++;
            });
            if(dplayer < maxPlayers){ 
                 channel.join.leave();
                 return message.channel.send(emError.setDescription("Il faut minimum 6 joueurs!"));
            }
            client.partyCreate = true;
            logChannel.send("Lancement de la partie...");
            play();
            clearInterval(this); 
    }, 30000);
      

     /*
     *  Durant la partie
     */
    
     function  play() {
        while(client.partyCreate){
          try{ 
            logChannel.send("Le jeu est lancé ! ");
          }catch(error){
                logChannel.send(error);
                client.partyCreate = false;
          }
        }
     }
  }
}


