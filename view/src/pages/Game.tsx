import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import { Theme, createStyles, TextField, Button, Grid, IconButton, CircularProgress, Modal } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import * as _ from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

const styles = ((theme: Theme) => (
    createStyles({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        toolbar: theme.mixins.toolbar,
        root: {
            minWidth: 340,
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
            backgroundColor: 'white',
            border: '1px solid',
            borderRadius: 50,
            padding: 2,
            marginRight: 2,
            color: 'black',
            fontWeight: 'bold',
            cursor: 'pointer'
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
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        },
        uiProgess: {
            position: 'fixed',
            Index: '1000',
            height: '31px',
            width: '31px',
            left: '50%',
            top: '35%'
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        modalStyle: {
            top: '50%',
            left: '50%',
            transform: "translate(-50%, -50%)"
        }
    }))
);

interface IProps {
    history?: Array<String>;
    classes?: any;
}

interface IState {
    loading?: boolean;
    ballsNumber?: Array<IBallState>,
    initialGameNumber?: string,
    finalGameNumber?: string,
    errors?: Array<string>,
    retrievedData?: IGame[],
    modalOpened?: boolean,
    gameNumberDuplicate?: string,
    gameToDuplicate?: IGame
}

interface IBallState {
    checked: boolean,
    value: string
}

interface IGame {
    gameNumber?: string,
    numbersPlayed: string[],
    gameId?: string,
}

class Game extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = this.initiateState();
    }

    initiateState = () => {
        return {
            loading: false,
            initialGameNumber: '',
            finalGameNumber: '',
            gameNumberDuplicate: '',
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
        this.setState({ loading: true });

        const { initialGameNumber, finalGameNumber, ballsNumber } = this.state;

        const ballsSelected = ballsNumber?.filter((ball: IBallState) => ball.checked);

        console.log(ballsSelected);

        var newGameRequest = {
            initialGameNumber,
            finalGameNumber,
            numbersPlayed: ballsSelected?.map((ball: IBallState) => ball.value)
        }

        const authToken = localStorage.getItem('AuthToken');

        axios.defaults.headers.common = { Authorization: `${authToken}` };

        try {
            await axios
                .post('https://us-central1-overtlite.cloudfunctions.net/api/new-game', newGameRequest)


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
            [event.target.name]: event.target.value
        });
    };

    componentWillMount = async () => {
        this.retrieveData();
    }

    retrieveData = async () => {
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };

        let allGames: Array<IGame> = [];

        try {
            const { data } = await axios.get('https://us-central1-overtlite.cloudfunctions.net/api/games-all');

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
            await axios.delete(`https://us-central1-overtlite.cloudfunctions.net/api/game/${game.gameId}`);

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
                numbersPlayed: gameToDuplicate.numbersPlayed
            }

            const authToken = localStorage.getItem('AuthToken');

            axios.defaults.headers.common = { Authorization: `${authToken}` };

            await axios
                .post('https://us-central1-overtlite.cloudfunctions.net/api/new-game', newGameRequest)

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
        const { gameNumberDuplicate, loading, initialGameNumber, finalGameNumber, ballsNumber, errors, retrievedData, modalOpened } = this.state;

        if (this.state.loading === true) {
            return (
                <div className={classes.root}>
                    {this.state.loading && <CircularProgress size={150} className={classes.uiProgess} />}
                </div>
            );
        } else {
            return (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Card className={classes.root}>
                        <CardContent>
                            <form className={classes.formInput} noValidate autoComplete="off">
                                <div>
                                    <TextField
                                        type="number"
                                        name="initialGameNumber"
                                        id="initialGameNumber"
                                        label="Initial Game Number"
                                        value={initialGameNumber}
                                        onChange={this.handleChange} />
                                </div>
                                <div>
                                    <TextField
                                        type="number"
                                        name="finalGameNumber"
                                        id="finalGameNumber"
                                        label="Final Game Number"
                                        value={finalGameNumber}
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
                                <Card className={classes.root} key={game.gameId}>
                                    <CardContent>
                                        <Grid container spacing={3} className={classes.cardHeader}>
                                            <Grid item xs>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    Game: {game.gameNumber}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs>
                                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => this.handleDelete(game)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => this.handleDuplicate(game)}>
                                                    <RefreshIcon />
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
                                    </CardContent>
                                </Card>

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