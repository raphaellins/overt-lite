import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import { Theme, Icon, createStyles, TextField, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const styles = ((theme: Theme) => (
    createStyles({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        toolbar: theme.mixins.toolbar,
        root: {
            minWidth: 340,
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
    errors?: Array<string> 
}

interface IBallState {
    checked: boolean,
    value: string
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
            ballsNumber:  [ 
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

        const {initialGameNumber, finalGameNumber, ballsNumber} = this.state;

        const ballsSelected = ballsNumber?.filter((ball:IBallState) =>  ball.checked);

        console.log(ballsSelected);

        var newGameRequest = {
            initialGameNumber,
            finalGameNumber,
            numbersPlayed: ballsSelected?.map((ball: IBallState) => ball.value)
        }

        console.log(newGameRequest);

        const authToken = localStorage.getItem('AuthToken');

		axios.defaults.headers.common = { Authorization: `${authToken}` };

        
        try{
            const {data} = await axios
            .post('https://us-central1-overtlite.cloudfunctions.net/api/new-game', newGameRequest)
           

            this.setState(this.initiateState());
        }catch(error){
            //TODO dont get the field with wrong value 
            // this.setState({errors: [error.response.data]})
            this.setState({ loading: false });
        }
       
    }

    onClickBall = (ballNumber: IBallState) => {
        let currentChange: boolean = !ballNumber.checked;

        let currentBalls: IBallState[] | undefined = this.state.ballsNumber;

        const ballsSelected = currentBalls?.filter((ball:IBallState) =>  ball.checked);

        if(ballsSelected && ballsSelected?.length == 15 && currentChange){
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
            if(ball.value == ballNumber.value){
                ball.checked = currentChange;
            }
        })

        this.setState({ballsNumber: currentBalls});
    }

    handleChange = (event: any) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

    render() {
        const { classes } = this.props;
        const {  loading,initialGameNumber, finalGameNumber, ballsNumber , errors} = this.state;
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
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <TextField 
                                    type="number"
                                    name="finalGameNumber"
                                    id="finalGameNumber" 
                                    label="Final Game Number" 
                                    value={finalGameNumber}
                                    onChange={this.handleChange}/>
                            </div>
                            <div className={classes.inputField}>
                                <Typography variant="h5" component="h2" className={classes.numbers}>
                                    {
                                        ballsNumber?.map((ballNumber: IBallState, index: number) => {
                                            if(index > 8)
                                                return
                                            return (<span 
                                            key={ballNumber.value}
                                            className={ballNumber.checked ? classes.ballChecked : classes.ball }
                                            onClick={() =>  this.onClickBall(ballNumber)}
                                            >{ballNumber.value}</span>)
                                        })
                                    }
                                </Typography>
                                <Typography variant="h5" component="h2" className={classes.numbers}>
                                {
                                        ballsNumber?.map((ballNumber: IBallState, index: number) => {
                                            if(index < 9 || index > 17)
                                                return
                                            return (<span 
                                            key={ballNumber.value}
                                            className={ballNumber.checked ? classes.ballChecked : classes.ball }
                                            onClick={() =>  this.onClickBall(ballNumber)}
                                            >{ballNumber.value}</span>)
                                        })
                                    }
                                </Typography>
                                <Typography variant="h5" component="h2">
                                {
                                        ballsNumber?.map((ballNumber: IBallState, index: number) => {
                                            if(index < 18)
                                                return
                                            return (<span 
                                            key={ballNumber.value}
                                            className={ballNumber.checked ? classes.ballChecked : classes.ball }
                                            onClick={() =>  this.onClickBall(ballNumber)}
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
                            { (
							<Typography variant="body2" className={classes.customError}>
								{errors}
							</Typography>
						)}
                            </div>
                        </form>

                    </CardContent>
                </Card>
            </main>
        )
    }
}

export default (withStyles(styles)(Game));