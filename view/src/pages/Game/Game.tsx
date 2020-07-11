import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import { TextField, Button, IconButton, CircularProgress, Modal } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as _ from 'lodash';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { newGame, listAllGames, deleteGame } from '../../util/Proxy';
import GameStatus from '../../elements/GameStatus';
import { IGameState, IGameProps, IGame } from '../../interfaces/GameState';
import { IBallState } from '../../interfaces/GameStatusState';
import styles from './GameStyle';

class Game extends Component<IGameProps, IGameState> {
    constructor(props: IGameProps) {
        super(props);

        this.state = this.initiateState();
    }

    initiateState = () => {
        return {
            loading: false,
            initialGameNumber: '',
            finalGameNumber: '',
            gameNumberDuplicate: '',
            gameDescription: '',
            gameToDuplicate: undefined,
            ballsNumber: [
                {
                    value: "01",
                    checked: false
                },
                {
                    value: "02",
                    checked: false
                },
                {
                    value: "03",
                    checked: false
                },
                {
                    value: "04",
                    checked: false
                },
                {
                    value: "05",
                    checked: false
                },
                {
                    value: "06",
                    checked: false
                },
                {
                    value: "07",
                    checked: false
                },
                {
                    value: "08",
                    checked: false
                },
                {
                    value: "09",
                    checked: false
                },
                {
                    value: "10",
                    checked: false
                },
                {
                    value: "11",
                    checked: false
                },
                {
                    value: "12",
                    checked: false
                },
                {
                    value: "13",
                    checked: false
                },
                {
                    value: "14",
                    checked: false
                },
                {
                    value: "15",
                    checked: false
                },
                {
                    value: "16",
                    checked: false
                },
                {
                    value: "17",
                    checked: false
                },
                {
                    value: "18",
                    checked: false
                },
                {
                    value: "19",
                    checked: false
                },
                {
                    value: "20",
                    checked: false
                },
                {
                    value: "21",
                    checked: false
                },
                {
                    value: "22",
                    checked: false
                },
                {
                    value: "23",
                    checked: false
                },
                {
                    value: "24",
                    checked: false
                },
                {
                    value: "25",
                    checked: false
                }
            ],
            errors: []
        };
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();

        const { initialGameNumber, finalGameNumber, ballsNumber, gameDescription } = this.state;

        const ballsSelected = ballsNumber?.filter((ball: IBallState) => ball.checked);

        const initialNumber = Number(initialGameNumber);
        const finalNumber = Number(finalGameNumber);

        if (isNaN(initialNumber) || initialNumber === 0
            || isNaN(finalNumber) || finalNumber === 0) {
            this.setState({ errors: ['Initial and final game number is required'], loading: false })
            return;
        }

        var newGameRequest = {
            initialGameNumber,
            finalGameNumber,
            gameDescription,
            numbersPlayed: ballsSelected?.map((ball: IBallState) => ball.value)
        }

        try {
            this.setState({ loading: true });

            await newGame(newGameRequest);

            await this.retrieveData();

            this.setState(this.initiateState());
        } catch (error) {
            this.setState({ loading: false });
        }

    }

    onClickBall = (ballNumber: IBallState) => {
        let currentChange: boolean = !ballNumber.checked;

        let currentBalls: IBallState[] | undefined = this.state.ballsNumber;

        const ballsSelected = currentBalls?.filter((ball: IBallState) => ball.checked);

        if (ballsSelected && ballsSelected?.length === 15 && currentChange) {
            this.setState({
                errors: [
                    'Only 15 numbers'
                ]
            });

            return;
        }

        this.setState({
            errors: [
            ]
        });

        currentBalls?.forEach((ball: IBallState) => {
            if (ball.value === ballNumber.value) {
                ball.checked = currentChange;
            }
        })

        this.setState({ ballsNumber: currentBalls });
    }

    handleChange = (event: any) => {
        this.setState({
            [event.target.name]: event.target.value,
            errors: []
        });
    };

    componentWillMount = async () => {
        this.setState({ loading: true });
        await this.retrieveData();

        const { retrievedData } = this.state;

        retrievedData?.forEach((game: IGame, index: number) => {
            const gameNumber = game.gameNumber ?? 0;
            if (gameNumber > 1980) {
                return
            }

            setTimeout(async () => {
                await deleteGame(game.gameId)
            }, 10000 * index)
        })


        this.setState({ loading: false });
    }

    retrieveData = async () => {
        let allGames: Array<IGame> = [];

        try {

            const { data } = await listAllGames();

            const gamesQueued: IGame[] = _.chain(data)
                .sortBy('gameNumber')
                .value();

            allGames.push.apply(allGames, gamesQueued);
        } catch (error) {
            console.log(error);
        }

        this.setState({ retrievedData: allGames });
    }

    handleDelete = async (game: IGame) => {
        try {

            this.setState({ loading: true });

            await deleteGame(game.gameId);

            await this.retrieveData();

            this.setState({ loading: false });
        } catch (error) {
            this.setState({ loading: false });
            console.log(error);
        }
    }

    handleDuplicate = async (game: IGame) => {
        this.setState({ gameToDuplicate: game });

        this.modalState(true);
    }

    duplicateGame = async () => {
        this.setState({ loading: true });

        try {
            const { gameToDuplicate, gameNumberDuplicate } = this.state;

            if (gameToDuplicate == null) {
                return;
            }

            var newGameRequest = {
                initialGameNumber: gameNumberDuplicate,
                finalGameNumber: gameNumberDuplicate,
                gameDescription: gameToDuplicate.gameDescription,
                numbersPlayed: gameToDuplicate.numbersPlayed
            }

            await newGame(newGameRequest);

            await this.retrieveData();

            this.modalState(false);

            this.setState(this.initiateState());
        } catch (error) {
            this.setState({ loading: false });
        }
    }

    modalState = async (state: boolean) => {
        this.setState({ modalOpened: state, gameNumberDuplicate: '' });
    }

    render() {
        const { classes } = this.props;
        const { gameNumberDuplicate, loading, initialGameNumber, finalGameNumber, ballsNumber, errors, retrievedData, modalOpened, gameDescription } = this.state;

        if (this.state.loading === true) {
            return (
                <div className={classes.root}>
                    {this.state.loading && <CircularProgress size={150} className={classes.uiProgess} />}
                </div>
            );
        } else {
            return (
                <main >
                    <div className={classes.toolbar} />
                    <Card className={classes.root}>
                        <CardContent>
                            <form className={classes.formInput} noValidate autoComplete="off">
                                <div className={classes.inputsGameNumber}>
                                    <TextField
                                        type="number"
                                        name="initialGameNumber"
                                        id="initialGameNumber"
                                        label="Initial Game Number"
                                        value={initialGameNumber}
                                        onChange={this.handleChange} />
                                    <TextField
                                        type="number"
                                        name="finalGameNumber"
                                        id="finalGameNumber"
                                        label="Final Game Number"
                                        value={finalGameNumber}
                                        onChange={this.handleChange} />
                                        <TextField
                                        name="gameDescription"
                                        id="gameDescription"
                                        label="Game Description"
                                        inputProps={{maxLength: 12}}
                                        value={gameDescription}
                                        onChange={this.handleChange} />
                                </div>
                                <div className={classes.inputField}>
                                    <Typography variant="h5" component="h2" className={classes.numbers}>
                                        {
                                            ballsNumber?.map((ballNumber: IBallState, index: number) => {
                                                if (index > 8)
                                                    return
                                                return (<span
                                                    key={ballNumber.value}
                                                    className={ballNumber.checked ? classes.ballChecked : classes.ball}
                                                    onClick={() => this.onClickBall(ballNumber)}
                                                >{ballNumber.value}</span>)
                                            })
                                        }
                                    </Typography>
                                    <Typography variant="h5" component="h2" className={classes.numbers}>
                                        {
                                            ballsNumber?.map((ballNumber: IBallState, index: number) => {
                                                if (index < 9 || index > 17)
                                                    return
                                                return (<span
                                                    key={ballNumber.value}
                                                    className={ballNumber.checked ? classes.ballChecked : classes.ball}
                                                    onClick={() => this.onClickBall(ballNumber)}
                                                >{ballNumber.value}</span>)
                                            })
                                        }
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {
                                            ballsNumber?.map((ballNumber: IBallState, index: number) => {
                                                if (index < 18)
                                                    return
                                                return (<span
                                                    key={ballNumber.value}
                                                    className={ballNumber.checked ? classes.ballChecked : classes.ball}
                                                    onClick={() => this.onClickBall(ballNumber)}
                                                >{ballNumber.value}</span>)
                                            })
                                        }
                                    </Typography>
                                </div>

                                <div className={classes.inputField}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        onClick={this.handleSubmit}>
                                        Save
                                </Button>
                                </div>
                                <div className={classes.inputField}>
                                    {(
                                        <Typography variant="body2" className={classes.customError}>
                                            {errors}
                                        </Typography>
                                    )}
                                </div>
                            </form>

                        </CardContent>
                    </Card>
                    {
                        retrievedData?.map((game: IGame) => {
                            return (
                                <GameStatus key={game.gameId} game={game} handleDelete={this.handleDelete} plusAction={this.handleDuplicate}></GameStatus>
                            )
                        })
                    }

                    <Modal
                        open={modalOpened ? modalOpened : false}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div className={[classes.paper, classes.modalStyle].join(' ')}>

                            <div>
                                <TextField
                                    type="number"
                                    name="gameNumberDuplicate"
                                    id="gameNumberDuplicate"
                                    label="Game Number"
                                    value={gameNumberDuplicate}
                                    onChange={this.handleChange} />
                            </div>

                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => this.modalState(false)}>
                                <CloseIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => this.duplicateGame()}>
                                <SaveIcon />
                            </IconButton>
                        </div>
                    </Modal>
                </main>
            )
        }




    }
}

export default (withStyles(styles)(Game));