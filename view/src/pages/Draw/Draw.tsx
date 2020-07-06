import React, { Component } from 'react'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import withStyles from '@material-ui/core/styles/withStyles';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import GameStatus from '../../elements/GameStatus';
import * as _ from 'lodash';
import { newDraw, listAllDraws, deleteDraw } from '../../util/Proxy';
import { IDrawState, IDrawProps, IDraw } from '../../interfaces/DrawState';
import { IBallState } from '../../interfaces/GameStatusState';
import styles from './DrawStyle';

class NewDraw extends Component<IDrawProps, IDrawState> {
    constructor(props: IDrawProps) {
        super(props);

        this.state = this.initiateState();
    }

    handleDateChange = (date: Date | null) => {
        this.setState({ drawDate: date });
    };

    initiateState = () => {
        return {
            loading: false,
            drawNumber: '',
            drawDate: new Date(),
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

        const { drawNumber, drawDate, ballsNumber } = this.state;

        if (drawNumber == null || Number(drawNumber) <= 0 || drawDate == null) {
            this.setState({ errors: ['Inform the Game Number'] });

            return;
        }

        this.setState({ loading: true });

        const ballsSelected = ballsNumber?.filter((ball: IBallState) => ball.checked);

        var newDrawRequest = {
            drawNumber,
            drawDate,
            numbersDrawn: ballsSelected?.map((ball: IBallState) => ball.value)
        }

        try {
            await newDraw(newDrawRequest);

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
            [event.target.name]: event.target.value
        });
    };

    componentWillMount = async () => {
        this.retrieveData();
    }

    retrieveData = async () => {
        let allDraws: Array<IDraw> = [];

        try {
            const { data } = await listAllDraws();

            const drawsQueued: IDraw[] = _.chain(data)
                .sortBy('drawNumber')
                .value();

            allDraws.push.apply(allDraws, drawsQueued);
        } catch (error) {
            console.log(error);
        }

        this.setState({ retrievedData: allDraws });
    }

    handleDelete = async (draw: IDraw) => {
        try {
            this.setState({ loading: true });

            await deleteDraw(draw.drawId);

            await this.retrieveData();

            this.setState({ loading: false });
        } catch (error) {
            this.setState({ loading: false });
            console.log(error);
        }
    }

    render() {
        const { classes } = this.props;
        const { loading, drawNumber, drawDate, ballsNumber, errors, retrievedData } = this.state;
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
                                <div className={classes.inputsGameNumber}>
                                    <TextField
                                        type="number"
                                        name="drawNumber"
                                        id="drawNumber"
                                        label="Draw Number"
                                        value={drawNumber}
                                        onChange={this.handleChange} />
                                </div>
                                <div>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date picker inline"
                                            value={drawDate}
                                            onChange={(value) => this.handleDateChange(value)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
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
                        retrievedData?.map((game: IDraw) => {
                            return (
                                <GameStatus key={game.drawId} game={{ gameId: game.drawId, gameNumber: game.drawNumber, numbersPlayed: game.numbersDrawn }} handleDelete={this.handleDelete}></GameStatus>
                            )
                        })
                    }
                </main>
            )
        }
    }
}

export default (withStyles(styles)(NewDraw));