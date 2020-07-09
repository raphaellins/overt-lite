import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { CircularProgress, TablePagination } from '@material-ui/core';
import * as _ from 'lodash';
import GameStatus from '../../elements/GameStatus';
import { listAllGamesMatched, deleteGame } from '../../util/Proxy';
import { ILotteryState, ILotteryProps, IGame } from '../../interfaces/LotteryState';
import { IBallState } from '../../interfaces/GameStatusState';
import styles from './LotteryStyle';
import GameCarrousel from '../../elements/GameCarrousel/GameCarrousel';


class Lottery extends Component<ILotteryProps, ILotteryState> {

    constructor(props: ILotteryProps) {
        super(props);
    }

    initiate = () => {
        this.state = {
            count: 0,
            page: 0,
            rowsPerPage: 5,
            retrievedData: [],
            gameQueued: [],
            gameFinished: [],
            gameFinishedScreen: [],
            gameQueuedScreen: []
        };
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


            this.setState({ count: gamesQueued.length });

        } catch (error) {
            console.log(error);
        }

        this.setState({ gameFinished: gamesFinished, gameQueued: gamesQueued });
    }

    loadQueuedGames = (pageChanged: number) => {
        let { count, rowsPerPage, gameQueued } = this.state;

        let gameQueuedScreen = [];
        let index = pageChanged;

        if (pageChanged > 0) {
            index = rowsPerPage * pageChanged;
        }

        for (let i = index; i < rowsPerPage * (pageChanged + 1) && i < count; i++) {
            gameQueuedScreen.push(gameQueued[i])
        }

        this.setState({ gameQueuedScreen })
    }


    loadFinishedGames = (pageChanged: number) => {
        let { count, rowsPerPage, gameFinished } = this.state;

        let gameFinishedScreen = [];
        let index = pageChanged;

        if (pageChanged > 0) {
            index = rowsPerPage * pageChanged;
        }

        for (let i = index; i < rowsPerPage * (pageChanged + 1) && i < count; i++) {
            gameFinishedScreen.push(gameFinished[i])
        }

        this.setState({ gameFinishedScreen })
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

    // handleChangePage = (event: any, value: number) => {
    //     this.setState({ page: value });

    //     // this.loadQueuedGames(value);
    // }

    // handleChangeRowsPerPage = (event: any) => {
    //     this.setState({ rowsPerPage: event.target.value });
    // }

    render() {
        const { classes } = this.props;
        const { gameFinished, gameQueued, count, page, rowsPerPage } = this.state;
        if (this.state.loading === true) {
            return (
                <div className={classes.root}>
                    {this.state.loading && <CircularProgress size={150} className={classes.uiProgess} />}
                </div>
            );
        } else {
            return (<main className={classes.root}>
                {/* <div className={classes.toolbar} />
                {
                    gameQueuedScreen.map((game: IGame) => {
                        return (
                            <GameStatus key={game.gameId} game={game} handleDelete={this.handleDelete}></GameStatus>
                        )
                    })
                }

                <TablePagination
                    component="div"
                    count={count}
                    page={page}
                    onChangePage={this.handleChangePage}
                    rowsPerPage={rowsPerPage ?? 10}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    rowsPerPageOptions={[2, 5]}
                /> */}


                <GameCarrousel games={gameQueued} handleDelete={this.handleDelete}></GameCarrousel>


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