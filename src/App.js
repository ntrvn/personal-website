import React from 'react';
import Terminal from './components/Terminal';
import Info from './components/Info';
import BrowserEmulator from './components/BrowserEmulator';

const intro = `Hello, I hope you have a nice day!
I am Nhan Tran, seinor standing at USC studying Computer Science.
Please hit ENTER to learn more about me `;
const error = `bash: command not found`;
const cdErrors = [`cd: not a directory: `, `cd: no such file or directory:`];
const openErrors = [`open: please enter a file name`, `open: not a file: `, `open: not such file in this directory: `];
const data = {
  NhanTran: "Experience Projects About",
  Experience: `Macys.txt J2Global.txt USC.txt`,
  Projects: `ImHungry.txt SCroup.txt PersonalWebsite.txt`
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
    filesOpened: []
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
          const open = this.state.lineCommand.split(" ");
          if (open.length !== 2) this.setState({text: `${this.state.text} \n ${openErrors[0]} \n ${this.state.currDirectoryText} > `});
          else {
            if (!open[1].includes(".txt")) this.setState({text: `${this.state.text} \n ${openErrors[1]} ${open[1]} \n ${this.state.currDirectoryText} > `});
            else if (!data[this.state.currDirectory].includes(open[1])) this.setState({text: `${this.state.text} \n ${openErrors[2]} ${open[1]} \n ${this.state.currDirectoryText} > `});
            else {
              console.log("here");
              this.setState({
                filesOpened: this.state.filesOpened.concat(open[1]),
                text: `${this.state.text} \n ${this.state.currDirectoryText} > `
              });
            }
          }
        } else if (this.state.lineCommand.includes("clear")) {
          console.log(this.state.currDirectory);
          console.log(this.state.currDirectoryText);
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
        files.forEach(el => {
          const temp = el.substring(0, fileName[1].length).toLowerCase();
          if (temp === fileName[1].toLowerCase()) {
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

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  render() {
    console.log(this.state.filesOpened);
    return (
      <div>
        {this.state.firstEnter === false ? 
          <Terminal text={intro} running={true} />
          :
          <Terminal text={this.state.text} running={false} />
        }
        <Info />
        {
          this.state.filesOpened !== [] && this.state.filesOpened.map((el,i) => {
            return <BrowserEmulator key={i} title={el} data={ExperienceData[el]} />
          })
        }
      </div>
    );
  }
}

export default App;
