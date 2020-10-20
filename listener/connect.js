const pronote = require("pronote-api");
module.exports = client => {
	client.connect = async (url, login,mdp, userChoice, exampleEmbed) => {
	console.log("coucou")
	if(login == null && mdp == null) return "Aucun identifiant..."
	const session = await pronote.login(url, login, mdp);
	exampleEmbed.setThumbnail(session.user.avatar)
	exampleEmbed.setFooter(session.user.name + " " + session.user.class)
	if(userChoice == "login"){ client.username = login; client.mdp = mdp; return message.reply("Vous êtes bien connecté" +
		":wink:")}
	else if(userChoice == "nte") {
		const marks = await session.marks();
		exampleEmbed.setTitle('Notes')
		var noteMatiere = "";
		var nomMatiere = marks.subjects[0];
		for(var i = 0; i < marks.subjects.length; i++){
			//Classifiez selon la matière
			if(nomMatiere == marks.subjects[i].name){
				for(var n = 0; n < marks.subjects[i].marks.length; n++){
					noteMatiere += ` *De: ${marks.subjects[i].marks[n].title}* :  __` +
					`${marks.subjects[i].marks[n].value}/${marks.subjects[i].marks[n].scale}__ \n`;
				}
			//Sinon on bascule sur une autre, pour classifiez
			}else{
				nomMatiere = marks.subjects[i].name;
				noteMatiere = ""
				for(var n = 0; n < marks.subjects[i].marks.length; n++){
					noteMatiere += ` *De: ${marks.subjects[i].marks[n].title}* : ` +
					` __${marks.subjects[i].marks[n].value}/${marks.subjects[i].marks[n].scale}__ \n`;
				}
			}
			exampleEmbed.addField(` Notes en ${nomMatiere} -> ${marks.subjects[i].averages.student} /` +
			` (classe) ${marks.subjects[i].averages.studentClass} `, `${noteMatiere}`);
		}
		exampleEmbed.addField(`Moyenne`, `Eleve: ${marks.averages.student}/20 \nClasse: ${marks.averages.studentClass}/20 `);
	}else if(userChoice == "dvr"){
		const marks = await session.homeworks();
		exampleEmbed.setTitle('Devoirs');
		var devoirJour = "";
		var Jour = marks[0].for;
		if(marks != null) for(var i =0; i < marks.length; i++){
			//Classifiez dans la même journée
			if(Jour.getDay() == marks[i].for.getDay()){
				devoirJour += ` **En: ${marks[i].subject}** :\n  __${marks[i].description}__ \n **Leçon:** ${("Aucune leçon" || 
				marks[i].lesson)}`;
				if(marks[i].files.length >= 1){
					for(let [name, url] of Object.entries(marks[i].files)){
						devoirJour += `**Fichiers:**[${"Fichier"}](${url.url})`;
					}
				}
				devoirJour += "\n\n"
			//Sinon on recommence un tableau
			}else{
				Jour = marks[i].for;
				exampleEmbed.addField(`Devoir pour le ${client.jourSemaine[marks[i].for.getDay() - 1]} ${marks[i].for.getDate()} / ` +
				`${marks[i].for.getMonth() + 1} `,
				` => ${devoirJour}`);
				devoirJour = "";
			}
		}
	}
	else if(userChoice == "edt"){
		const marks = await session.timetable()
		for(var time in marks){
			exampleEmbed.addField(`**${time.subject} - ${time.teacher}**`, `=> **${time.room}**`, false))	
		}	
	}else if(userChoice == "infos") return await session.infos();
	else exampleEmbed.addField(`Je suis sur la session de ${session.user.name}`, `${session.user.class}`);
	return exampleEmbed;
   }
}
