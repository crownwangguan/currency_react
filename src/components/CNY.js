import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Topbar from "./Topbar";

const backgroundShape = require("../images/shape.svg");

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  block: {
    padding: theme.spacing(2)
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  inlining: {
    display: "inline-block",
    marginRight: 10
  },
  buttonBar: {
    display: "flex"
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end"
  },
  noBorder: {
    borderBottomStyle: "hidden"
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: "absolute",
    top: "40%",
    left: "40%"
  }
});

class CNY extends Component {
    constructor() {
		super();
		this.state = {currencies: []};
	}
    componentDidMount() {
        fetch('https://currencyflask.herokuapp.com/api/')
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            this.setState({ currencies: data })
        })
        .catch(console.log)
    }

  render() {
    const { classes } = this.props;
    const currencies = this.state.currencies;
    const trans = {
        'CAD': "加元",
        'AUD': "澳元",
        'EUR': "欧元",
        'JPY': "日元",
        'USD': "美元",
        'CNY': "人民币",
        'HKD': "港币"
    }
    const renderCurrency = () => {
        let table = []
        for(var prop in currencies.rates) { 
            if (['CAD', 'AUD', 'EUR', 'JPY', 'USD', 'HKD'].includes(prop)) {
                table.push(<Typography>{trans[prop]}: {currencies.rates[prop].toFixed(5)}</Typography>)
            }
        }
        return table
    }
    
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              spacing={4}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
            <Grid container item xs={12}>
                <Grid item xs={12}>
                    
                    <Paper className={classes.paper}>
                        <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs>
                            <Typography color="secondary" gutterBottom>
                            人民币今日汇率
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {trans[currencies.date]}
                            </Typography>
                            <div className={classes.blockCenter}>
                                
                                { renderCurrency() }
                                
                            </div>
                        </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(CNY));