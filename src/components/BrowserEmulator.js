import React from 'react';
import {withStyles} from '@material-ui/core';

const styles = {
    root: {
        display: "block",
        width: "500px",
        height: "700px",
        position: 'absolute',
        left: '20px',
        top: '20px',
    },
    header: {
        display: "block",
        width: "500",
        height: "25px",
        backgroundColor: "rgb(220, 220, 220)",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
    },
    circle: {
        float: "left",
        width: "15px",
        height: "15px",
        marginLeft: "10px",
        borderRadius: "50%",
        marginTop: "5px",
    },
    content: {
        display: "block",
        width: "500px",
        height: "500px",
        backgroundColor: "white",
        outline: "none",
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
        color: 'black',
        fontFamily: `'Ubuntu Mono', monospace`,
        overflowY: "scroll"
    },
    text: {
        padding: "10px",
        marginTop: 0, 
        marginBottom: 0
    }
}

const BrowserEmulator = (props) => {
    const classes = props.classes
    const data = props.data;
    const handleClicked = () => {
        props.onChangeIndex();
    }
    const handleClose = () => {
        props.onCloseBrowser();
    }
    return (
        <div className={classes.root} style={{zIndex: `${props.index}`}} onClick={handleClicked}>
            <div className={classes.header}>
                <div
                    className={classes.circle}
                    style={{ backgroundColor: "rgb(255, 59, 71)" }}
                    onClick={handleClose}
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
            <div className={classes.content}>
                <h1 className={classes.text}>{data.title}</h1>
                {data.detail.map((el,id) => {
                    return <p key={id} className={classes.text}>> {el}</p>
                })}
            </div>
        </div>
    );
}

export default withStyles(styles)(BrowserEmulator);