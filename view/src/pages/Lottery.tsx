import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Theme, createStyles, CircularProgress } from '@material-ui/core';
import * as _ from 'lodash';
import GameStatus from '../elements/GameStatus';
import { listAllGamesMatched, deleteGame } from '../util/Proxy';

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
        line: {
            marginBottom: 50,
            marginTop: 50,
            color: 'gray'
        }
    }))
);

interface IProps {
    history?: Array<String>;
    classes?: any;
    gameFinished?: IGame[],
    gameQueued?: IGame[]
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
    retrievedData?: IGame[],
    gameFinished?: IGame[],
    gameQueued?: IGame[]
}

class Lottery extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    componentWillMount = async () => {
        this.retrieveData();
    }

    retrieveData = async () => {
        let gamesQueued: Array<IGame> = [];
        let gamesFinished: Array<IGame> = [];

        try {

            const { data } = await listAllGamesMatched();

             gamesFinished  = _.chain(data)
                .filter((game: IGame) => game.numbersDrawn.length > 0)
                .sortBy('gameNumber')
                .reverse()
                .value();

            gamesFinished = gamesFinished.map((game: IGame) => {
                let ballScenario: Array<IBallState> = []

                game.numbersDrawn.map((value: string) => {
                    ballScenario.push({
                        checked: game.ballsMatched?.some((matched: string) => matched === value),
                        value: value
                    })

                    return value;
                })

                return {
                    ...game,
                    numbersState: ballScenario
                }
            });

             gamesQueued = _.chain(data)
                .filter((game: IGame) => game.numbersDrawn.length === 0)
                .sortBy('gameNumber')
                .value();

        } catch (error) {
            console.log(error);
        }

        this.setState({ gameFinished: gamesFinished, gameQueued: gamesQueued });
    }

    handleDelete = async (game: IGame) => {
        try {

            this.setState({ loading: true });

            await deleteGame(game.gameId)

            await this.retrieveData();

            this.setState({ loading: false });
        } catch (error) {
            this.setState({ loading: false });
            console.log(error);
        }
    }

    render() {
        const { classes } = this.props;
        const { gameFinished, gameQueued } = this.state;
        if (this.state.loading === true) {
            return (
                <div className={classes.root}>
                    {this.state.loading && <CircularProgress size={150} className={classes.uiProgess} />}
                </div>
            );
        } else {
            return (<main className={classes.content}>
                <div className={classes.toolbar} />
                {
                    gameQueued?.map((game: IGame) => {
                        return (
                            <GameStatus game={game} handleDelete={this.handleDelete}></GameStatus>
                        )
                    })
                }
                <hr className={classes.line} />
                {
                    gameFinished?.map((game: IGame) => {
                        return (
                            <GameStatus game={game} handleDelete={this.handleDelete}></GameStatus>
                        )
                    })
                }

            </main>)
        }
    }
}

export default (withStyles(styles)(Lottery));