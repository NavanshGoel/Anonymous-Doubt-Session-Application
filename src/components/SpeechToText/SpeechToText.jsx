import React, { Component } from "react";
import SpeechToText from "speech-to-text";
import supportedLanguages from "./supportedLanguages";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

const styles = (theme) => ({
  root: {
    paddingTop: 65,
    paddingLeft: 11,
    paddingRight: 11,
  },
  flex: {
    flex: 1,
  },
  grow: {
    flexGrow: 1,
  },
  paper: theme.mixins.gutters({
    paddingTop: 22,
    paddingBottom: 22,
  }),
});

class SpeechToTextDemo extends Component {
  state = {
    error: "",
    interimText: "",
    finalisedText: [],
    listening: false,
    language: "en-US",
  };

  onAnythingSaid = (text) => {
    this.setState({ interimText: text });
  };

  onEndEvent = () => {
    if (!isWidthUp("sm", this.props.width)) {
      this.setState({ listening: false });
    } else if (this.state.listening) {
      this.startListening();
    }
  };

  onFinalised = (text) => {
    this.setState({
      finalisedText: [text, ...this.state.finalisedText],
      interimText: "",
    });
  };

  startListening = () => {
    try {
      this.listener = new SpeechToText(
        this.onFinalised,
        this.onEndEvent,
        this.onAnythingSaid,
        this.state.language
      );
      this.listener.startListening();
      this.setState({ listening: true });
    } catch (err) {
      console.log(err);
    }
  };

  stopListening = () => {
    this.listener.stopListening();
    this.setState({ listening: false });
  };

  render() {
    const {
      error,
      interimText,
      finalisedText,
      listening,
      language,
    } = this.state;
    const { classes } = this.props;
    let content;
    if (error) {
      console.log(error);
    } else {
      let buttonForListening;

      if (listening) {
        buttonForListening = (
          <Button onClick={() => this.stopListening()}>Stop Listening</Button>
        );
      } else {
        buttonForListening = (
          <Button onClick={() => this.startListening()} variant="contained">
            Start Listening
          </Button>
        );
      }
      content = (
        <Grid container spacing={16}>
          <Grid item xs={12} md={12}>
            <Paper className={this.props.classes.paper}>
              <Grid container spacing={16}>
                <Grid item xs={12} lg={6}>
                  <Typography variant="overline" gutterBottom>
                    Status: {listening ? "listening..." : "finished listening"}
                  </Typography>
                  <br />
                  {buttonForListening}
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={language}
                      onChange={(evt) =>
                        this.setState({ language: evt.target.value })
                      }
                      disabled={listening}
                    >
                      {supportedLanguages.map((language) => (
                        <MenuItem key={language[1]} value={language[1]}>
                          {language[0]}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      What language are you going to speak in?
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Finalised Text</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {finalisedText[0]}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      );
    }
    return <Grid container>{content}</Grid>;
  }
}
export default withWidth()(withStyles(styles)(SpeechToTextDemo));
