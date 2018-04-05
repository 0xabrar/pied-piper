import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input, Button, List, Header, Icon, Modal, Form } from "semantic-ui-react";
import {
  updateTicketThunk
}from "../actions/thunk/tickets";
import {
  updateNoteSafeThunk,
  deleteNoteSafeThunk,
} from "../actions/thunk/selectedTicket";

const style = {
  disabledNote: {
    color: "grey"
  },
  enabledNote: {},
  modal : {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

const NoteContainer = props => {
  return (
    <List divided relaxed verticalAlign="middle">
      <Header as="h2">Notes</Header>
      <AddNote 
        ticket={props.ticket}
        addNoteFunc={props.addNote}
        />
      {props.ticket.notes.map((note, i) => {
        return (
          <Note
            key={i}
            index={i}
            note={note}
            ticket={props.ticket}
            resolveNoteFunc={props.resolveNote}
            deleteNoteFunc={props.deleteNote}
            editNoteFunc={props.editNote}
            disabled={note.resolved || !props.UIEnabled}
          />
        );
      })}
    </List>
  );
};

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: "" };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTextChange(e) {
    this.setState({ inputText: e.target.value });
  }
  handleSubmit(e) {
    this.props.addNoteFunc(this.props.ticket.ticketId,
      {note:{
        ticketId: this.props.ticket.ticketId,
        text: this.state.inputText
      }}
    );
    this.setState({ inputText: "" });
  }
  render() {
    return (
      <List.Item>
        <Input
          placeholder="Enter a new note here..."
          value={this.state.inputText}
          onChange={this.handleTextChange}
        />
        <Button onClick={this.handleSubmit}>
          <Icon name="plus" />
        </Button>
      </List.Item>
    );
  }
}

class EditNote extends React.Component{
  constructor(props) {
    super(props);
    this.state = {noteText: ""}
  }
  handleTextChange =(e) => {
    this.setState({noteText: e.target.value })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.editNoteFunc(
      this.props.index, 
      this.props.note, 
      this.props.ticket, 
      this.state.noteText)
  }
 render() {
  return (
    <Modal trigger={<Button
      icon
      size="tiny"
      data-tooltip="Edit"
      ><Icon name="pencil" />
      </Button>}
      style={style.modal}>
      <Modal.Header>Edit Note</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              label="Text"
              fluid
              iconPosition="left"
              placeholder= {this.props.note.text}
              onChange = {this.handleTextChange}
            />
            <Button size="small" color="green" >
              Update Note
            </Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
  </Modal>
    
  )}


}

class Note extends React.Component {
  constructor(props) {
    super(props);
    //this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this);
    this.handleResolve = this.handleResolve.bind(this);
  }
  handleResolve() {
    this.props.resolveNoteFunc(
      this.props.index,
      this.props.note,
      this.props.ticket
    );
  }
  handleDelete() {
    this.props.deleteNoteFunc(
      this.props.index,
      this.props.note,
      this.props.ticket
    );
  }
  render() {
    return (
      <List.Item>
        <List.Content floated="right">
          {/* <Button
            icon
            size="tiny"
            data-tooltip="Edit"
            onClick={() => {}}
            disabled={this.props.disabled}
          >
            <Icon name="pencil" />
          </Button> */}
          <EditNote 
            note={this.props.note} 
            index={this.props.index} 
            ticket={this.props.ticket}
            editNoteFunc={this.props.editNoteFunc}/>
          <Button
            icon
            size="tiny"
            data-tooltip="Delete"
            onClick={this.handleDelete}
            disabled={this.props.disabled}
          >
            <Icon name="delete" />
          </Button>
          <Button
            icon
            size="tiny"
            data-tooltip="Resolve"
            onClick={this.handleResolve}
            disabled={this.props.disabled}
          >
            <Icon name="checkmark" />
          </Button>
        </List.Content>
        <List.Icon name="sticky note outline" size="large" />
        <List.Content>
          <List.Header
            style={this.props.disabled ? style.disabledNote : {}}
            as="h4"
          >
            {this.props.note.text}
          </List.Header>
          <List.Description as="p">{this.props.note.created}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

const mapStateToProps = state => ({
  ticket: state.selectedTicket.ticket,
  UIEnabled: state.selectedTicket.UIEnabled
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addNote: updateTicketThunk,
      resolveNote: updateNoteSafeThunk,
      deleteNote: deleteNoteSafeThunk,
      editNote: updateNoteSafeThunk
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
