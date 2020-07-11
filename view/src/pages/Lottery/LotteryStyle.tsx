import { Theme, createStyles } from "@material-ui/core";

const styles = ((theme: Theme) => (
    createStyles({
        root: {
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        matchedTitle: {
            fontSize: 18,
            color: 'green'
        },
        uiProgess: {
            position: 'fixed',
            Index: '1000',
            height: '31px',
            width: '31px',
            left: '50%',
            top: '35%'
        },
        toolbar: theme.mixins.toolbar,
        line: {
            marginBottom: 50,
            marginTop: 50,
            color: 'gray'
        },
    }))
);

export default styles;