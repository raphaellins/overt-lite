import { IGameCarrouselState, IGameCarrouselProps } from "../../interfaces/GameCarrouselState";
import { Component } from "react";
import { TablePagination, withStyles } from "@material-ui/core";
import { IGame } from "../../interfaces/LotteryState";
import GameStatus from "../GameStatus";
import styles from "./GameCarrouselStyle";
import React from "react";

class GameCarrousel extends Component<IGameCarrouselProps, IGameCarrouselState> {

    initiateState = () => {
        this.setState({
            count: 0,
            rowsPerPage: 2,
            page: 0
        });
    }

    componentWillMount() {
        this.initiateState();

        setTimeout(() => {
            this.setState({ count: this.props.games.length })
            this.prepareDate(0);
        }, 1000);

    }

    handleChangePage = (event: any, value: number) => {
        const { rowsPerPage } = this.state;
        this.prepareDate(value, rowsPerPage);
    }

    handleChangeRowsPerPage = (event: any) => {
        const { page } = this.state;

        this.prepareDate(page, event.target.value)
    }

    prepareDate = (pageChanged: number, rowsPerPageChanged: number = 2) => {
        let { count } = this.state;
        const { games } = this.props;

        let gameScreen: IGame[] = [];
        let index = pageChanged;

        if (pageChanged > 0) {
            index = rowsPerPageChanged * pageChanged;
        }

        for (let i = index; i < rowsPerPageChanged * (pageChanged + 1) && i < count; i++) {
            console.log(i);
            gameScreen.push(games[i])
        }

        this.setState({ ...this.state, gamesScreen: gameScreen, page: pageChanged, rowsPerPage: rowsPerPageChanged })
    }

    render() {
        const { handleDelete } = this.props;
        const { count, page, rowsPerPage, gamesScreen } = this.state;
        return (<div>
            {
                gamesScreen?.map((game: IGame) => {
                    return (
                        <GameStatus key={game.gameId} game={game} handleDelete={handleDelete}></GameStatus>
                    )
                })
            }

            <TablePagination
                component="div"
                count={count}
                page={page}
                onChangePage={this.handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                rowsPerPageOptions={[2, 5]}
            />
        </div>
        )
    }
}


export default (withStyles(styles)(GameCarrousel));