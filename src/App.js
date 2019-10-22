import React from 'react';
import Terminal from './components/Terminal';
import Info from './components/Info';
import BrowserEmulator from './components/BrowserEmulator';
import Resume from './components/Resume';

const intro = `Hello, I hope you have a nice day!
I am Nhan Tran, senior standing at USC studying Computer Science.
Please hit ENTER to learn more about me `;
const error = `bash: command not found`;
const cdErrors = [`cd: not a directory: `, `cd: no such file or directory:`];
const openErrors = [`open: please enter a file name`, `open: not a file: `, `open: not such file in this directory: `];
const data = {
  NhanTran: "Experience Projects About",
  Experience: `Macys.txt J2Global.txt USC.txt`,
  Projects: `PersonalWebsite.txt ImHungry.txt SCroup.txt BarCrawler.txt`,
  About: `NhanTran.txt`
};
const ExperienceData = {
  "Macys.txt": {
    title: "Macys",
    detail: [`I interned at Macy's for the summer of 2019. I was on their Machine Learning Platform Team and my project for the summer was a chatbot project.`,
    `I trained a customer service chatbot using RASA, an open source conversational AI framework, to handle inquiries regarding returns, shipment status, promotions, store locations, and product specifications.`,
    `I then implemented custom React components to show recommended Macy’s products. Integrated with Macy's internal REST API to query for products relevant to the conversation.`,
    `Finally, I modified RASA to support multimodal inputs via both text and speech. Integrated with Google's voice-to-text API to transcribe voice input. I did this so that Google devices can use the chatbot.`,
    `Beside the chatbot, I also helped build a web application using React/Redux and Django to allow training chatbot through a web interface, without requiring operators to provision a local development environment.`]
  },
  "J2Global.txt": {
    title: "J2 Global",
    detail: [`I interned at J2 Global for the summer of 2018. This internship is where I learned most of my web development skills. I got to learn React JS, which is the front-end framework that I'm most passionate about.`,
    `I had 2 projects over that summer. First, I Built custom status tracking tool to monitor uptime and response times of over 50 websites. Implemented false positive detection and downtime alerts to notify marketing and engineering teams.`,
    `Then, I designed and led implementation of custom task monitoring tool to track status of JIRA tickets, and issue reports about stale tasks and development velocity. Delegated implementation between two other interns.`]
  },
  "USC.txt": {
    title: "USC",
    detail: [`I was a teaching assistant for Viterbi School of Engineering.`,
    `I Conducted office hours with a team of 4 TAs for 50+ students, covering various topics related to full-stack web development. Additional responsibilities included helping debug code during lecture, and grading assignments.`,
    `I Acted as PM for students' final projects. Assisted in defining scope for projects as well as technical feasibility.`]
  },
  "PersonalWebsite.txt": {
    title: "Personal Website",
    detail: [`I took a different approach when creating my personal website. I want it to be interactive, and engaging, that's why I decided to make a Terminal emulator.`, `
    every functionality of this website is correctly implemented, most of the commands like 'ls', 'cd', 'open' are not hardcoded. the entire site is built with React JS (my favorite front-end framework) and hosted on Heroku.`,
    `Github repo: https://github.com/ntrvn/personal-website`]
  },
  "ImHungry.txt": {
    title: "Im Hungry",
    detail: [`As a part of my Software Engineering class, I Built a restaurant and recipe recommendation web application with three USC students by using Yelp and Spoonacular APIs.`,
    ` Me and another teammate wrote all of the frontend code as well as frontend acceptance tests using Cucumber testing tool, and followed a continuous integration release.`,
    `Github repo: https://github.com/joshmin98/Im_Hungry_Redux`]
  },
  "SCroup.txt": {
    title: "SCroup",
    detail: [`As me and my friends stuggle to find study group for classes that we are in. 4 of us Developed a web application to assist USC students to find study groups based on their schedules and classes.`,
    `We Implemented recommendation system based on matching user profiles and availabilities. Integrated chat and file sharing functionalities to facilitate group communication.`,
    `Github repo: https://github.com/PeterYangIO/SCroup`]
  },
  "BarCrawler.txt": {
    title: "BarCrawler",
    detail: [`This is my first full stack application that I've ever wrote. It was my final project for a Web Development class. I love find new new bars around me and made this application so that it would be easier for me to do it.`,
    `I used Google API to get all the bars info around me and also implemented CRUD functionality where users can add/reomve bars from their saved list.`,
    `Github repo: https://github.com/ntrvn/barCrawler`]
  },
  "NhanTran.txt": {
    title: "Nhan Tran",
    detail: [`Connect with me on LinkedIn: https://www.linkedin.com/in/nhandattran/`]
  }
}
const doNotRegisters = ["Meta", "Alt", "Control", "Shift", "Caps", "LockTab", "ArrowRight", "ArrowLeft" , "ArrowDown" , "ArrowUp"];

class App extends React.Component {

  state = {
    firstEnter: false,
    text : "~/NhanTran > ",
    lineCommand: "",
    currDirectoryText: "~/NhanTran",
    currDirectory: "NhanTran",
    filesOpened: [],
    indexes: {
      terminal : -1,
      browser: 1
    }
  }

  handleKeyPress = (event) => {
    event.preventDefault()
    if (event.key === 'Enter') {
      if (this.state.firstEnter === false) {
        this.setState({firstEnter : true});
      } else {
        if (this.state.lineCommand.includes("ls")) {
          if (this.state.lineCommand !== "ls") this.setState({text: `${this.state.text} \n ${error} \n ${this.state.currDirectoryText} > `}) 
          else {
            this.setState({text: `${this.state.text} \n ${data[this.state.currDirectory]} \n ${this.state.currDirectoryText} > `});
          } 
        } else if (this.state.lineCommand.includes("cd")) {
          const cd = this.state.lineCommand.split(" ");
          if (cd.length !== 2) this.setState({text: `${this.state.text} \n ${error} \n ${this.state.currDirectoryText} > `});
          else {
            if (cd[1] === ".." || cd[1] === "../") {
              if (this.state.currDirectory !== "NhanTran") {
                this.setState({
                  currDirectory: "NhanTran",
                  currDirectoryText: "~/NhanTran",
                })
              }
              this.setState({text: `${this.state.text} \n ${this.state.currDirectoryText} > `})
            } else {
              if (cd[1].includes("txt")) {
                this.setState({text: `${this.state.text} \n ${cdErrors[0]} ${cd[1]} \n ${this.state.currDirectoryText} > `})
              } else if (!data[this.state.currDirectory].includes(cd[1])) {
                this.setState({text: `${this.state.text} \n ${cdErrors[1]} ${cd[1]} \n ${this.state.currDirectoryText} > `})
              } else {
                this.setState({
                  text: `${this.state.text} \n ${this.state.currDirectoryText}/${cd[1]} > `,
                  currDirectoryText: `${this.state.currDirectoryText}/${cd[1]}`,
                  currDirectory: cd[1]
                })
              }
            }
          }
        } else if (this.state.lineCommand.includes("open")) {
          this.bringToBack();
          const open = this.state.lineCommand.split(" ");
          if (open.length !== 2) this.setState({text: `${this.state.text} \n ${openErrors[0]} \n ${this.state.currDirectoryText} > `});
          else {
            if (!open[1].includes(".txt")) this.setState({text: `${this.state.text} \n ${openErrors[1]} ${open[1]} \n ${this.state.currDirectoryText} > `});
            else if (!data[this.state.currDirectory].includes(open[1])) this.setState({text: `${this.state.text} \n ${openErrors[2]} ${open[1]} \n ${this.state.currDirectoryText} > `});
            else {
              this.setState({
                filesOpened: this.state.filesOpened.concat(open[1]),
                text: `${this.state.text} \n ${this.state.currDirectoryText} > `
              });
            }
          }
        } else if (this.state.lineCommand.includes("clear")) {
          this.setState({text: `${this.state.currDirectoryText} > `})
        } else if (this.state.lineCommand === "") {
          this.setState({text: `${this.state.text} \n ${this.state.currDirectoryText} > `})
        }
        else {
          this.setState({text: `${this.state.text} \n ${error} \n ${this.state.currDirectoryText} > `})
        }
        this.setState({lineCommand: ""})
      }
    } else if (event.key === 'Backspace') {
      this.state.lineCommand !== "" && this.setState({
        text : this.state.text.substring(0, this.state.text.length - 1),
        lineCommand: this.state.lineCommand.substring(0, this.state.lineCommand.length -1)
      })
    } else if (event.key === "Tab") {
      event.preventDefault();
      if (this.state.lineCommand.includes("cd") || this.state.lineCommand.includes("open")) {
        const files = data[this.state.currDirectory].split(" ");
        const fileName = this.state.lineCommand.split(" ");
        fileName.length === 2 && files.forEach(el => {
          const temp = el.substring(0, fileName[1].length).toLowerCase();
          if (temp === fileName[1].toLowerCase() && temp !== "" && fileName !== "") {
            this.setState({
              text: this.state.text.substring(0, this.state.text.length-temp.length) + el,
              lineCommand: `${fileName[0]} ${el}`
            })
          }
        });
      }
    } else if (!doNotRegisters.includes(event.key)) {
      this.setState({
        text : this.state.text + event.key,
        lineCommand: this.state.lineCommand + event.key
      });
    }
  }

  bringToFront = () => {
    this.setState({
      indexes: {
        terminal : 1,
        browser: -1
      }
    });
  }

  bringToBack = () => {
    this.setState({
      indexes: {
        terminal : -1,
        browser: 1
      }
    });
  }

  handleCloseBrowser = () => {
    let newArr = this.state.filesOpened;
    newArr.length > 1 ? newArr.pop() : newArr = [];
    this.setState({filesOpened: newArr});
  }


  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  render() {
    return (
      <div>
        {this.state.firstEnter === false ? 
          <Terminal text={intro} running={true} index={this.state.indexes.terminal} onChangeIndex={this.bringToFront} />
          :
          <Terminal text={this.state.text} running={false} index={this.state.indexes.terminal} onChangeIndex={this.bringToFront} />
        }
        <Info />
        <Resume />
        {
          this.state.filesOpened !== [] && this.state.filesOpened.map((el,i) => {
            return <BrowserEmulator key={i} title={el} data={ExperienceData[el]} index={this.state.indexes.browser} onChangeIndex={this.bringToBack} onCloseBrowser={this.handleCloseBrowser}/>
          })
        }
      </div>
    );
  }
}

export default App;
