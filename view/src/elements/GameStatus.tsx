import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import { Theme, Icon, createStyles, IconButton, CircularProgress } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import * as _ from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = ((theme: Theme) => (
    createStyles({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        toolbar: theme.mixins.toolbar,
        root: {
            minWidth: 500,
            marginBottom: 10
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 18,
        },
        matchedTitle: {
            fontSize: 18,
            color: 'green'
        },
        pos: {
            marginBottom: 12,
        },
        ball: {
            backgroundColor: 'orange',
            borderRadius: 50,
            padding: 2,
            marginRight: 2,
            color: 'black',
            fontWeight: 'bold'
        },
        ballChecked: {
            backgroundColor: 'green',
            borderRadius: 50,
            padding: 2,
            marginRight: 2,
            color: 'white',
            fontWeight: 'bold',
        },
        ballMatched: {
            backgroundColor: 'green',
        },
        numbers: {
            marginBottom: 10
        },
        cardHeader: {
            marginBottom: 10
        },
        uiProgess: {
            position: 'fixed',
            Index: '1000',
            height: '31px',
            width: '31px',
            left: '50%',
            top: '35%'
        },
    }))
);

interface IProps {
    history?: Array<String>;
    classes?: any;
    game: IGame;
    handleDelete: Function;
}

interface IState {
    email?: String;
    password?: String;
    errors?: Error;
    loading?: boolean;
    retrievedData?: IGame[],
    gameFinished?: IGame[],
    gameQueued?: IGame[]
}

interface IGame {
    gameNumber: string,
    numbersPlayed: string[],
    numbersDrawn: string[],
    numbersState: IBallState[],
    gameId: string,
    countMatched: number,
    ballsMatched: string[]
}

interface IBallState {
    checked: boolean,
    value: string
}

class GameStatus extends Component<IProps, IState> {



    render() {
        const { classes, game, handleDelete } = this.props;
        return (

            <Card className={classes.root} key={game.gameId}>
                                <CardContent>
                                    <Grid container spacing={3} className={classes.cardHeader}>
                                        <Grid item xs>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                Game: {game.gameNumber}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            {
                                                game.countMatched ? 
                                                     (
                                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                            Matched: {game.countMatched}
                                                        </Typography>
                                                    )
                                                : ''
                                            }
                                        
                                            
                                        </Grid>
                                        <Grid item xs>
                                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => handleDelete(game)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>

                                    <Typography variant="h5" component="h2" className={classes.numbers}>

                                        {
                                            game.numbersPlayed.map((ballNumber: string, index: number) => {
                                                return (<span className={classes.ball} key={game.gameId + ballNumber}>{ballNumber}</span>)
                                            })
                                        }
                                    </Typography>

                                    <Typography variant="h5" component="h2" className={classes.numbers}>

                                        {
                                            game.numbersState?.map((ballNumber: IBallState, index: number) => {
                                                return (<span className={ballNumber.checked ? classes.ballChecked : classes.ball} key={game.gameId + ballNumber.value}>{ballNumber.value}</span>)
                                            })
                                        }
                                    </Typography>
                                </CardContent>
                            </Card>
        );
    }

}

export default (withStyles(styles)(GameStatus));