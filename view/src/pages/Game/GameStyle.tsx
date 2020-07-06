import { createStyles, Theme } from "@material-ui/core";

const styles = ((theme: Theme) => (
    createStyles({
        root: {
            marginBottom: 10,
            marginTop: 10,
        },
        title: {
            fontSize: 18,
        },
        pos: {
            marginBottom: 12,
        },
        ball: {
            backgroundColor: 'white',
            border: '1px solid',
            borderRadius: 50,
            padding: 2,
            marginRight: 2,
            color: 'black',
            fontWeight: 'bold',
            cursor: 'pointer'
        },
        ballChecked: {
            backgroundColor: 'green',
            border: '1px solid',
            borderRadius: 50,
            padding: 2,
            marginRight: 2,
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
        },
        numbers: {
            marginBottom: 10
        },
        formInput: {
            marginBottom: 10,
            marginRight: 5
        },
        ballsNumbers: {
            marginTop: 20
        },
        inputField: {
            marginTop: 10
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        },
        uiProgess: {
            position: 'fixed',
            Index: '1000',
            height: '31px',
            width: '31px',
            left: '50%',
            top: '35%'
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        toolbar: theme.mixins.toolbar,
        modalStyle: {
            top: '50%',
            left: '50%',
            transform: "translate(-50%, -50%)"
        },
        inputsGameNumber:{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 10,
            maxWidth: 200
        }
    }))
);

export default styles;