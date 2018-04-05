import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateLink } from "../actions/actionCreator/upload";
import { postFileThunk } from "../actions/thunk/upload";
import { getUploadState } from "../reducers/index";
import { Container, Form, Button, Header, Label } from "semantic-ui-react";

class UploadScreen extends Component {
  onFormSubmit = (event, link) => {
    event.preventDefault();
    this.props.postFile(link);
  };

  showLabel = () => {
    const message = this.props.upload.printingmessage;
    if (message !== "") {
      return <Label>{this.props.upload.printingmessage}</Label>;
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Header as="h2" color="green" textAlign="center">
            Document Submission
          </Header>
          <Form
            onSubmit={event =>
              this.onFormSubmit(event, this.props.upload.fileToBeSent)
            }
          >
            <Form.Input
              fluid
              icon="upload"
              iconPosition="left"
              placeholder="document url"
              value={this.props.upload.fileToBeSent}
              onChange={event => this.props.updateLink(event.target.value)}
            />
            <Button size="small" color="green">
              Upload File
            </Button>
            {this.showLabel()}
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  upload: getUploadState(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      postFile: postFileThunk,
      updateLink
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UploadScreen);
