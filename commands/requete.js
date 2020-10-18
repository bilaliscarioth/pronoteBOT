module.exports = {
	name: 'requete',
	description: 'Les requêtes à envoyer!',
	execute(message, args, pronote, Discord, client) {
		const exampleEmbed = new Discord.MessageEmbed()
			.setAuthor("Pronote-API", "https://upload.wikimedia.org/wikipedia/commons/8/87/Logo-pronote-menu.png")
			.setDescription("Bot fait avec l'aide de Litarvan\npronote-api: https://github.com/Litarvan/pronote-api \nson github : https://github.com/Litarvan")
			.setColor('#000')
			.setTimestamp();
		async function main(){
				const session = await pronote.login(client.url, (args[1] || client.username),(args[2] || client.password),);
				console.log(session.user.name + " " + session.user.studentClass.name); // Affiche la classe de l'élève et son nom
				exampleEmbed.setFooter(session.user.name + " " + session.user.studentClass.name);
				if(args[0]){
					if(args[0] == "dvr"){
						exampleEmbed.setTitle('Devoirs');
						var marks = await session.homeworks(); // Récupérer les devoirs d'une période
						var devoirJour = "";
						var Jour = marks[0].for;
						for(var i =0; i < marks.length; i++){	
							if(Jour.getDay() == marks[i].for.getDay()){
								devoirJour += ` **En: ${marks[i].subject}** :\n  __${marks[i].description}__ \n **Leçon:** ${("Aucune leçon" || marks[i].lesson)}`;
								if(marks[i].files.length >= 1){
									for(let [name, url] of Object.entries(marks[i].files)){
										devoirJour += `**Fichiers:**[${"Fichier"}](${url.url})`;
									}
								}
								devoirJour += "\n\n"
							}else{
								Jour = marks[i].for;
								exampleEmbed.addField(`Devoir pour le ${client.jourSemaine[marks[i].for.getDay() - 1]} ${marks[i].for.getDate()} / ${marks[i].for.getMonth() + 1} `,
								` => ${devoirJour}`);
								devoirJour = "";
							}
						}
					}else if(args[0] == "nte"){
						exampleEmbed.setTitle('Notes')
						const marks = await session.marks(); // Récupérer les notes du trimestre
						var noteMatiere = "";
						var nomMatiere = marks.subjects[0];
						for(var i = 0; i < marks.subjects.length; i++){
							if(nomMatiere == marks.subjects[i].name){
								for(var n = 0; n < marks.subjects[i].marks.length; n++){
									noteMatiere += ` *De: ${marks.subjects[i].marks[n].title}* :  __${marks.subjects[i].marks[n].res}/${marks.subjects[i].marks[n].scale}__ \n`;
								}
							}else{
								nomMatiere = marks.subjects[i].name;
								noteMatiere = ""
								for(var n = 0; n < marks.subjects[i].marks.length; n++){
									noteMatiere += ` *De: ${marks.subjects[i].marks[n].title}* : __${marks.subjects[i].marks[n].res}/${marks.subjects[i].marks[n].scale}__ \n`;
								}
							}
							exampleEmbed.addField(` Notes en ${nomMatiere} -> ${marks.subjects[i].averages.student} / (classe) ${marks.subjects[i].averages.studentClass} `, `${noteMatiere}`);
						}
						exampleEmbed.addField(`Moyenne`, `Eleve: ${marks.averages.student}/20 \nClasse: ${marks.averages.studentClass}/20 `);
					}else	if(args[0] == "infos"){ 
						const contents = await session.infos(); // Récupérer les annonces
						for(var i = 0; i < contents.length; i++){
							exampleEmbed.addField(`=> ${contents[i].author} `, ` > ${contents[i].title}`, true)
						}
					}else	if(args[0] == "edt"){
						const contents = await session.timetable(); // Récupérer l'emploie du temps
						for(var i = 0; i < contents.length; i++){
							exampleEmbed.addField(`=> ${contents[i].subject} `, ` > ${contents[i].room}/${contents[i].teacher} \n de ${contents[i].from.getHours()}H- ${contents[i].to.getHours()}H`, false)
						}
					}else	if(args[0] == "login"){
						message.channel.send(":white_check_mark: Connecté sur la session de: " + session.user.name);
						session.setKeepAlive(true);
						setInterval(function(){
							session.logout;
							session.setKeepAlive(false);
							if(!session.setKeepAlive()){
								client.users.cache.get(message.author.id).send("Je me suis déconnecté de votre compte :wink:.");
								clearInterval(this);
							 }
						},60000*30); // Durant 30 minutes, on se déconnecte
					}else{
							exampleEmbed.addField(`> Je suis dans la session de `, ` > ${session.user.name} de la classe ${session.user.studentClass.name}`)					
					}
				}else{
						exampleEmbed.addField(`Les commandes`, `.requete (nte|dvr|edt|infos|login) [identifiant] [mot de passe]`, false);
				}
				if(args[0] == "login" && args[1] && args[2]){
					client.username = args[1];
					client.password = args[2];
				}
				exampleEmbed.setThumbnail(session.user.avatar);
				message.channel.send(exampleEmbed);
					// etc. les fonctions utilisables sont 'timetable', 'marks', 'contents', 'evaluations', 'absences',
					// 'infos', et 'menu', sans oublier les champs 'user' et 'params' qui regorgent d'informations.
				}
		main().catch(err => {
				if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
				    message.channel.send('Mauvais identifiants...');    
				}else if(args[0] == undefined){
						exampleEmbed.addField(`Les commandes`, `.requete (nte|dvr|edt|infos) [identifiant] [mot de passe]`, false);
						message.channel.send(exampleEmbed);
				}else {
				    message.channel.send(err.code + "\n ```" +err.message+ "```");
				}
		});
	},
};
