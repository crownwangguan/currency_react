import React, { Component, useState } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TransformIcon from '@material-ui/icons/Transform';

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
    textAlign: "center",
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
  },
  selectEmpty: {
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 150,
    textAlign: 'center',
  },
  paperResult: {
    padding: theme.spacing(3),
    textAlign: "center",
    minWidth: 150,
    alignItems: "center",
    color: theme.palette.text.secondary,
    height: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});

class CONVERT extends Component {
    constructor() {
		super();
		this.state = {
            from: '',
            to: '',
            result: 0.00
        };
        this.handleChangeFrom = this.handleChangeFrom.bind(this)
        this.handleChangeTo = this.handleChangeTo.bind(this)
        this.convertCurrency = this.convertCurrency.bind(this)
	}
    convertCurrency = () => {
        fetch('https://currencyflask.herokuapp.com/api/convert?from='+this.state.from+'&to='+this.state.to)
        .then(res => res.json())
        .then((data) => {
            this.setState({ result: data.rate.toFixed(5)})
        })
        .catch(console.log)
    }
        
    handleChangeTo = (event) => {
        this.setState({to: event.target.value});
    };

    handleChangeFrom = (event) => {
        this.setState({from: event.target.value});
    };

  render() {
    const { classes } = this.props;
    
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
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                    <React.Fragment>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Typography color="secondary" gutterBottom>
                            从币种：
                            </Typography>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.from}
                            onChange={this.handleChangeFrom}
                            className={classes.selectEmpty}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'cny'}>人民币</MenuItem>
                            <MenuItem value={'cad'}>加元</MenuItem>
                            <MenuItem value={'usd'}>美元</MenuItem>
                            <MenuItem value={'aud'}>澳元</MenuItem>
                            <MenuItem value={'eur'}>欧元</MenuItem>
                            <MenuItem value={'jpy'}>日元</MenuItem>
                            <MenuItem value={'hkd'}>港币</MenuItem>
                            </Select>
                        </FormControl><br />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Typography color="secondary" gutterBottom>
                            到币种：
                            </Typography>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.to}
                        onChange={this.handleChangeTo}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'cny'}>人民币</MenuItem>
                            <MenuItem value={'cad'}>加元</MenuItem>
                            <MenuItem value={'usd'}>美元</MenuItem>
                            <MenuItem value={'aud'}>澳元</MenuItem>
                            <MenuItem value={'eur'}>欧元</MenuItem>
                            <MenuItem value={'jpy'}>日元</MenuItem>
                            <MenuItem value={'hkd'}>港币</MenuItem>
                            </Select>
                        </FormControl>
                    </React.Fragment>
                    <br />
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            endIcon={<TransformIcon />}
                            onClick={this.convertCurrency}
                        >
                            查看
                        </Button>
                    </Paper>
                    
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paperResult}>
                        <Typography color="secondary" variant="h3" gutterBottom>
                            {this.state.result}
                        </Typography>
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

export default withRouter(withStyles(styles)(CONVERT));