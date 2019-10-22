import React, {useState} from 'react';
import { withStyles } from '@material-ui/styles';
import { Popover, Fab } from '@material-ui/core';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

const Styles = {
    root : {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
    },
    content : {
        padding: 10,
        fontFamily: `'Ubuntu Mono', monospace`,
    },
    p : {
        marginTop: '0px',
        marginBottom: '0px'
    }
}

const Info = (props) => {
    const classes = props.classes;
    const[anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;

    return (
        <div className={classes.root}>
            <Fab size="large" aria-label="help" color="primary" onClick={handleClick}>
                <LiveHelpIcon fontSize="large"/>
            </Fab>
            <Popover 
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                rounded={true}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                >
                    <div className={classes.content}>
                        <h2 className={classes.p}>Instruction</h2>
                        <p className={classes.p}>After hitting enter, this site will become an emulator of terminal.</p>
                        <p className={classes.p}>Available Commands:</p>
                        <p className={classes.p}>&nbsp; ls - to see all files and directories in the current directory.</p>
                        <p className={classes.p}>&nbsp; cd DIRECTORY-NAME - to go into a directory (hit tab while typing directory name for auto-complete).</p>
                        <p className={classes.p}>&nbsp; cd .. - to go back to parent directory. </p>
                        <p className={classes.p}>&nbsp; open FILENAME - to open all .txt files</p>
                        <p className={classes.p}>&nbsp; clear to clear all text inside the terminal.</p>
                        <p className={classes.p}></p>
                        <p className={classes.p}>Once a txt file is opened. You can click back to the terminal window to execute other commands and open other files.</p>
                        <p className={classes.p}>You can also close the txt file window by clicking on the red circle on the top left of the txt file window</p>
                    </div>
            </Popover>        
        </div>
    )
}

export default withStyles(Styles)(Info);