import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import { Theme, Icon, createStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import * as _ from 'lodash';

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
            border: '1px solid',
            borderRadius: 50,
            padding: 2,
            marginRight: 2,
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
        },
        ballMatched: {
            backgroundColor: 'green',
        },
        numbers: {
            marginBottom: 10
        }
    }))
);

interface IProps {
    history?: Array<String>;
    classes?: any;
}

interface IBallState {
    checked: boolean,
    value: string
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

interface IState {
    email?: String;
    password?: String;
    errors?: Error;
    loading?: boolean;
    retrievedData?: IGame[]
}

class Lottery extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    componentWillMount = async () => {
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };

        let allGames: Array<IGame> = [];

        try {
            const { data } = await axios.get('https://us-central1-overtlite.cloudfunctions.net/api/games');

            let gamesFinished: Array<IGame> = _.chain(data)
                .filter((game: IGame) => game.numbersDrawn.length > 0)
                .sortBy('gameNumber')
                .reverse()
                .value();

            gamesFinished = gamesFinished.map((game: IGame) => {
                let ballScenario: Array<IBallState> = []

                game.numbersDrawn.map((value: string) => {

                    ballScenario.push({
                        checked: game.ballsMatched?.some((matched: string) => matched == value),
                        value: value
                    })
                })

                return {
                    ...game,
                    numbersState: ballScenario
                }
            });

            const gamesQueued: IGame[] = _.chain(data)
                .filter((game: IGame) => game.numbersDrawn.length == 0)
                .sortBy('gameNumber')
                .value();

            allGames.push.apply(allGames, gamesQueued);
            allGames.push.apply(allGames, gamesFinished);
        } catch (error) {
            console.log(error);
        }

        this.setState({ retrievedData: allGames });
    }

    render() {
        const { classes } = this.props;
        const { retrievedData } = this.state;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {
                    retrievedData?.map((game: IGame) => {
                        return (
                            <Card className={classes.root} key={game.gameId}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Game: {game.gameNumber} - Matched: {game.countMatched}
                                    </Typography>

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
                        )
                    })
                }
            </main>
        )
    }
}

export default (withStyles(styles)(Lottery));