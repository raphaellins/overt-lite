import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import { Theme, Icon, createStyles } from '@material-ui/core';
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
      ballMatched: {
          backgroundColor: 'green',
      },
      numbers: {
          marginBottom: 10
      }
    }))
);

interface IProps {
    history?: Array<String>;
    classes?: any;
}

interface IGame {
    gameNumber: string,
    numbersPlayed: string[],
    gameId: string
}

interface IState {
	email?: String;
	password?: String;
    errors?: Error;
    loading?: boolean;
    retrievedData?: IGame[]
}

class Lottery extends Component<IProps, IState> {

    constructor(props: IProps) {
		super(props);

		this.state = {};
    }

    componentWillMount = async () => {
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        
        const {data} = await axios.get('https://us-central1-overtlite.cloudfunctions.net/api/games');

        const allGames: IGame[] = data.map((game: IGame) => {
            return game;
        });

        this.setState({ retrievedData: allGames});
    }

    render() {
        const { classes } = this.props;
        const {retrievedData} = this.state;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {
                    retrievedData?.map((game: IGame) => {
                        return (
                            <Card className={classes.root} key={game.gameId}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {game.gameNumber}
                                    </Typography>

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

                {/* <Card className={classes.root}>
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        9928  -  20/06/2020
                    </Typography>
                    <Typography variant="h5" component="h2" className={classes.numbers}>
                        <span className={classes.ball}>01</span>
                        <span className={classes.ball}>02</span>
                        <span className={classes.ball}>03</span>
                        <span className={classes.ball}>04</span>
                        <span className={classes.ball}>05</span>
                        <span className={classes.ball}>06</span>
                        <span className={classes.ball}>07</span>
                        <span className={classes.ball}>08</span>
                        <span className={classes.ball}>09</span>
                        <span className={classes.ball}>10</span>
                        <span className={classes.ball}>11</span>
                        <span className={classes.ball}>12</span>
                        <span className={classes.ball}>13</span>
                        <span className={classes.ball}>14</span>
                        <span className={classes.ball}>15</span>
                        <span className={classes.ball}>16</span>
                        <span className={classes.ball}>17</span>
                        <span className={classes.ball}>18</span>
                        <span className={classes.ball}>19</span>
                        <span className={classes.ball}>20</span>
                        <span className={classes.ball}>21</span>
                        <span className={classes.ball}>22</span>
                        <span className={classes.ball}>23</span>
                        <span className={classes.ball}>24</span>
                        <span className={classes.ball}>25</span>
                    </Typography>
                    <Typography variant="h5" component="h2">
                        <span className={classes.ball}>01</span>
                        <span className={classes.ball}>02</span>
                        <span className={classes.ball}>03</span>
                        <span className={classes.ball}>04</span>
                        <span className={classes.ball}>05</span>
                        <span className={classes.ball}>06</span>
                        <span className={classes.ball}>07</span>
                        <span className={classes.ball}>08</span>
                        <span className={classes.ball}>09</span>
                        <span className={classes.ball}>10</span>
                        <span className={classes.ball}>11</span>
                        <span className={classes.ball}>12</span>
                        <span className={classes.ball}>13</span>
                        <span className={classes.ball}>14</span>
                        <span className={classes.ball}>15</span>
                        <span className={classes.ball}>16</span>
                        <span className={classes.ball}>17</span>
                        <span className={classes.ball}>18</span>
                        <span className={classes.ball}>19</span>
                        <span className={classes.ball}>20</span>
                        <span className={classes.ball}>21</span>
                        <span className={classes.ball}>22</span>
                        <span className={classes.ball}>23</span>
                        <span className={classes.ball}>24</span>
                        <span className={classes.ball}>25</span>
                    </Typography>
                    </CardContent>
                </Card> */}
            </main>
        )
    }
}

export default (withStyles(styles)(Lottery));