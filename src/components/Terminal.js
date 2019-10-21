import React, {useState, useRef, useEffect} from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
    box: {
        display: "block",
        width: "700px",
        height: "400px",
        margin: "auto",
        marginTop: "100px",
        borderRadius: "5px",
    },
    navbar: {
        display: "block",
        width: "700px",
        height: "25px",
        backgroundColor: "rgb(220, 220, 220)",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
    },
    circle: {
        display: "inline-block",
        width: "15px",
        height: "15px",
        marginLeft: "10px",
        borderRadius: "50%",
        marginTop: "5px",
    },
    main: {
        display: "block",
        width: "700px",
        height: "375px",
        backgroundColor: "rgb(39, 39, 39)",
        outline: "none",
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
        overflowY: "scroll"
    },
    displayText: {
        paddingTop: 10,
        paddingLeft: 10
    },
    text: {
        marginTop: 0,
        color: 'white',
        fontFamily: `'Ubuntu Mono', monospace`,
    }
}

const Terminal = (props) => {
    const text = props.text;
    const [header, setHeader] = useState("");
    const [index, setIndex] = useState(0);
    const [blink,setBlink] = useState(true);
    const textEndRef = useRef(null);
    const classes = props.classes;
  
    // running text animation
    header !== text && setTimeout(() => {
      setHeader(text.substring(0,index));
      setIndex(index + 1);
    }, 50);
    
  
    // blinking cursor effect
    const blinking = () => {
      setTimeout(() => {
        blink ? setBlink(false) : setBlink(true);
        return blink;
      }, 300)
      return blink;
    }

    // scroll to bottom of terminal
    const scrollToBotoom = () => {
        textEndRef.current.scrollIntoView({behavior: "smooth"});
    }
    useEffect(scrollToBotoom, [text]);

    // bring terminal window back to front
    const handleClicked = () => {
        console.log("here");
        props.onChangeIndex();
    }

    return (
        <div className={classes.box} style={{zIndex: `${props.index}`}} onClick={handleClicked}>
            <div className={classes.navbar}>
                <div
                    className={classes.circle}
                    style={{ backgroundColor: "rgb(255, 59, 71)" }}
                />
                <div
                    className={classes.circle}
                    style={{ backgroundColor: "rgb(255, 193, 0)" }}
                />
                <div
                    className={classes.circle}
                    style={{ backgroundColor: "rgb(0, 215, 66)" }}
                />
            </div>
            <div
                className={classes.main}
                id="maintab"
            >
                {
                    props.running ? (
                        <div className={classes.displayText}>
                            {header.includes("\n") ? header.split("\n").map((i, key) => {
                            return <p className={classes.text} key={key}>{"> " + i}{(blinking() && key===2) ? "|" : ""}</p>;
                            }) : <p className={classes.text}>{"> " + header}{blinking() ? "|" : ""}</p>}
                        </div>
                    ) : (
                        <div className={classes.displayText}>
                            {text.includes("\n") ? text.split("\n").map((i, key) => {
                                return <p className={classes.text} key={key}>
                                        {i}
                                        {(blinking() && key===text.split("\n").length-1) ? "|" : ""}
                                    </p>
                            }) : <p className={classes.text}>{text}{blinking() ? "|" : ""}</p>}
                            
                        </div>
                    )
                }
                <div ref={textEndRef} />
            </div>
        </div>
    );
}

export default withStyles(styles)(Terminal);