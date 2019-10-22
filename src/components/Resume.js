import React, {useState} from 'react';
import {withStyles, Button, Dialog} from '@material-ui/core';
import {Document, Page, pdfjs} from 'react-pdf';
import nhantran from './nhantran.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const style = {
    root : {
        position: 'absolute',
        bottom: '25px',
        right: '100px',
    },
    button: {
        marginTop: '-35px'
    },
    link: {
        textDecoration: "none",
        color: "white"
    },
}

const Resume = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const classes = props.classes;

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div className={classes.root}>
            <Button size="large" variant="contained" color="primary" onClick={openModal}>View my resume</Button>
            <Dialog open={modalOpen} onClose={closeModal} aria-labelledby="customized-dialog-title" className={classes.content}>
                
                <Document file={nhantran} className={classes.dialogContent}>
                    <Page pageNumber={1} height={600} />
                </Document>
                <Button variant="contained" className={classes.button} color="primary" fullWidth={true}>
                    <a href={nhantran} className={classes.link} download>Download</a>
                </Button>
            </Dialog>
        </div>
    )
}

export default withStyles(style)(Resume);