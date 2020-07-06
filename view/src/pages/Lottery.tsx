import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Theme, createStyles, CircularProgress } from '@material-ui/core';
import * as _ from 'lodash';
import GameStatus from '../elements/GameStatus';
import { listAllGamesMatched, deleteGame } from '../util/Proxy';
import { ILotteryState, ILotteryProps, IGame } from '../interfaces/LotteryState';
import { IBallState } from '../interfaces/GameStatusState';

const styles = ((theme: Theme) => (
    createStyles({
        root: {
            marginTop: 10
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

class Lottery extends Component<ILotteryProps, ILotteryState> {

    constructor(props: ILotteryProps) {
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

            gamesFinished = _.chain(data)
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
            return (<main className={classes.root}>
                <div className={classes.toolbar} />
                {
                    gameQueued?.map((game: IGame) => {
                        return (
                            <GameStatus key={game.gameId} game={game} handleDelete={this.handleDelete}></GameStatus>
                        )
                    })
                }
                <hr className={classes.line} />
                {
                    gameFinished?.map((game: IGame) => {
                        return (
                            <GameStatus key={game.gameId} game={game} handleDelete={this.handleDelete}></GameStatus>
                        )
                    })
                }

            </main>)
        }
    }
}

export default (withStyles(styles)(Lottery));