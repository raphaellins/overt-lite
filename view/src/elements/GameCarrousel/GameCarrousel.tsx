import { IGameCarrouselState, IGameCarrouselProps } from "../../interfaces/GameCarrouselState";
import { Component } from "react";
import { TablePagination, withStyles } from "@material-ui/core";
import { IGame } from "../../interfaces/LotteryState";
import GameStatus from "../GameStatus";
import styles from "./GameCarrouselStyle";
import React from "react";

class GameCarrousel extends Component<IGameCarrouselProps, IGameCarrouselState> {

    constructor(props: IGameCarrouselProps) {
        super(props);


    }

    initiateState = () => {
        this.setState({
            count: 0 ,
            rowsPerPage: 5,
            page: 0
        });
    }

    componentWillMount() {
        this.initiateState();

        setTimeout(() => {
            console.log('will prepare data', this.props.games);

            this.setState({count: this.props.games.length})
            this.prepareDate(0);
        }, 1000);

    }

    handleChangePage = (event: any, value: number) => {
        this.setState({ page: value });


        this.prepareDate(value);
    }

    handleChangeRowsPerPage = (event: any) => {
        this.setState({ rowsPerPage: event.target.value });
    }


    prepareDate = (pageChanged: number) => {
        let { count, rowsPerPage } = this.state;
        const { games } = this.props;

        let gameScreen: IGame[] = [];
        let index = pageChanged;

        if (pageChanged > 0) {
            index = rowsPerPage * pageChanged;
        }

        for (let i = index; i < rowsPerPage * (pageChanged + 1) && i < count; i++) {
            console.log(i);
            gameScreen.push(games[i])
        }



        this.setState({ ...this.state, gamesScreen: gameScreen })
    }

    render() {
        const { games, classes, handleDelete } = this.props;
        const { count, page, rowsPerPage } = this.state;
        return (<div>
            <div className={classes.toolbar} />
            {
                games.map((game: IGame) => {
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
                rowsPerPage={rowsPerPage ?? 10}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                rowsPerPageOptions={[2, 5]}
            />
        </div>
        )
    }
}


export default (withStyles(styles)(GameCarrousel));