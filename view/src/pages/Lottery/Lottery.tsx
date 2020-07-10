import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { CircularProgress } from '@material-ui/core';
import * as _ from 'lodash';
import { listAllGamesMatched, deleteGame } from '../../util/Proxy';
import { ILotteryState, ILotteryProps, IGame } from '../../interfaces/LotteryState';
import { IBallState } from '../../interfaces/GameStatusState';
import styles from './LotteryStyle';
import GameCarrousel from '../../elements/GameCarrousel/GameCarrousel';


class Lottery extends Component<ILotteryProps, ILotteryState> {

    initiate = () => {
        this.setState({
            retrievedData: [],
            gameQueued: [],
            gameFinished: [],
            gameFinishedScreen: [],
            gameQueuedScreen: []
        })
    }

    componentWillMount = async () => {
        this.retrieveData();
        this.initiate();
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
            return (
                <main className={classes.root}>
                    <div className={classes.toolbar} />
                    <GameCarrousel games={gameQueued} handleDelete={this.handleDelete}></GameCarrousel>

                    <hr className={classes.line} />

                    <GameCarrousel games={gameFinished} handleDelete={this.handleDelete}></GameCarrousel>
                </main>)
        }
    }
}

export default (withStyles(styles)(Lottery));