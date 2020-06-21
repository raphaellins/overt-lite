import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import { Theme, Icon, createStyles, TextField, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = ((theme: Theme) => (
    createStyles({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        toolbar: theme.mixins.toolbar,
        root: {
            minWidth: 340,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
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
            fontWeight: 'bold'
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
        }
    }))
);

interface IProps {
    history?: Array<String>;
    classes?: any;
}

interface IState {
    email?: String;
    password?: String;
    errors?: Error;
    loading?: boolean;
}

class Game extends Component<IProps, IState> {

    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Card className={classes.root}>
                    <CardContent>
                        <form className={classes.formInput} noValidate autoComplete="off">
                            <div>
                                <TextField id="standard-basic" label="Initial Game Number" />
                            </div>
                            <div>
                                <TextField id="standard-basic" label="Final Game Number" />
                            </div>
                            <div className={classes.inputField}>
                                <Typography variant="h5" component="h2" className={classes.numbers}>
                                    <span className={classes.ball}>01</span>
                                    <span className={classes.ball}>02</span>
                                    <span className={classes.ball}>03</span>
                                    <span className={classes.ball}>04</span>
                                    <span className={classes.ball}>05</span>
                                    <span className={classes.ball}>06</span>
                                    <span className={classes.ball}>07</span>
                                    <span className={classes.ball}>08</span>
                                    <span className={classes.ball}>09</span>
                                </Typography>
                                <Typography variant="h5" component="h2" className={classes.numbers}>
                                    <span className={classes.ball}>10</span>
                                    <span className={classes.ball}>11</span>
                                    <span className={classes.ball}>12</span>
                                    <span className={classes.ball}>13</span>
                                    <span className={classes.ball}>14</span>
                                    <span className={classes.ball}>15</span>
                                    <span className={classes.ball}>16</span>
                                    <span className={classes.ball}>17</span>
                                    <span className={classes.ball}>18</span>
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    <span className={classes.ball}>19</span>
                                    <span className={classes.ball}>20</span>
                                    <span className={classes.ball}>21</span>
                                    <span className={classes.ball}>22</span>
                                    <span className={classes.ball}>23</span>
                                    <span className={classes.ball}>24</span>
                                    <span className={classes.ball}>25</span>
                                </Typography>
                            </div>

                            <div className={classes.inputField}>
                            <Button variant="contained" color="primary">
                                Save
                            </Button>
                            </div>
                        </form>

                    </CardContent>
                </Card>
            </main>
        )
    }
}

export default (withStyles(styles)(Game));