import React from 'react';
import Terminal from './Terminal';
import Info from './Info';

const intro = `Hello, I hope you have a nice day!
I am Nhan Tran, seinor standing at USC studying Computer Science.
Please hit ENTER to learn more about me `;
const error = `bash: command not found`;
const cdErrors = [`cd: not a directory: `, `cd: no such file or directory:`];
const data = {
  NhanTran: "Experience Projects About",
  Experience: `Macy's.txt J2-Global.txt USC.txt`,
  Projects: `I'm-Hungry.txt SCroup.txt Personal-Website.txt`
};
const doNotRegisters = ["Meta", "Alt", "Control", "Shift", "Caps", "LockTab", "ArrowRight", "ArrowLeft" , "ArrowDown" , "ArrowUp"];

class App extends React.Component {

  state = {
    firstEnter: false,
    text : "~/NhanTran > ",
    lineCommand: "",
    currDirectoryText: "~/NhanTran",
    currDirectory: "NhanTran"
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
      if (this.state.lineCommand.includes("cd")) {
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
    return (
      <div>
        {this.state.firstEnter === false ? 
          <Terminal text={intro} running={true}/>
          :
          <Terminal text={this.state.text} running={false} />
        }
        <Info />
      </div>
    );
  }
}

export default App;
