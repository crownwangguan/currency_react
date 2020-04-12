import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter,Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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

class Main extends Component {
    constructor() {
		super();
        this.state = {
            currencies: [],
            redirect: false,
            redirectConvert: false
        };
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
    
    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
        this.props.history.push(`/cny`)
            return <Redirect to='/cny' />
        }
    }

    setRedirectConvert = () => {
        this.setState({
          redirectConvert: true
        })
    }
    renderRedirectConvert = () => {
        if (this.state.redirectConvert) {
        this.props.history.push(`/convert`)
            return <Redirect to='/convert' />
        }
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
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography
                      style={{ textTransform: "uppercase" }}
                      color="secondary"
                      gutterBottom
                    >
                      人民币今日汇率
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {trans[currencies.base]}
                    </Typography>
                    <Typography variant="body3" gutterBottom>
                        {currencies.date}
                    </Typography>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {this.renderRedirect()}
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.actionButtom}
                      onClick={this.setRedirect}
                    >
                      点击查看
                    </Button>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography
                      style={{ textTransform: "uppercase" }}
                      color="secondary"
                      gutterBottom
                    >
                      币种兑换查询
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      查看任意币种之前汇率
                    </Typography>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {this.renderRedirectConvert()}
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.actionButtom}
                      onClick={this.setRedirectConvert}
                    >
                      点击查看
                    </Button>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography
                      style={{ textTransform: "uppercase" }}
                      color="secondary"
                      gutterBottom
                    >
                      计算兑换
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      查看可换得金额
                    </Typography>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.actionButtom}
                    >
                      点击查看
                    </Button>
                  </div>
                </Paper>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div>
                      <div className={classes.box}>
                        <Typography color="secondary" gutterBottom>
                          历史数据
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          正在开发中，未开放
                        </Typography>
                      </div>
                      <div className={classes.alignRight}>
                        <Button
                          color="primary"
                          variant="contained"
                          className={classes.actionButtom}
                        >
                          点击查看
                        </Button>
                      </div>
                    </div>
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

export default withRouter(withStyles(styles)(Main));