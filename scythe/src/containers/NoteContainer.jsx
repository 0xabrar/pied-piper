import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {addNoteThunk} from '../actions/thunk/notes.js'
import { Input, Button, List, Header, Icon } from 'semantic-ui-react'

const NoteContainer = (props) => {
	return (
		<List divided relaxed verticalAlign='middle'>
			<Header as='h2'>Notes</Header>
			<AddNote addNoteFunc={props.addNote}/>
			{props.notes.map((note, i) => {
				return (<Note key={i} note={note} handleDelete={props.handleDelete} handleResolve={props.handleResolve} disabled={note.resolved || !props.UIEnabled}/>)
			})}
		</List>
	)
}

class AddNote extends React.Component {
	constructor(props){
		super(props)
		this.state = {inputText: ''}
		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleTextChange(e) {
		this.setState({inputText: e.target.value})
	}
	handleSubmit(e){
		this.props.addNoteFunc(this.state.inputText)
		console.log(this.props)
	}
	render () {
		return (
			<List.Item>
				<Input placeholder='Enter a new note here...' onChange={this.handleTextChange}/>
				<Button onClick={this.handleSubmit}><Icon name='plus'/></Button>
			</List.Item>
		)
	}
}

class Note extends React.Component {
	render() {
		return (
			<List.Item>
				<List.Content floated='right'>
					{/* TODO: Implement add, edit */}
					<Button icon size='tiny' data-tooltip="Edit" onClick={() => this.props.handleEdit(this.props.key)} disabled={this.props.disabled}><Icon name='pencil'/></Button>
					<Button icon size='tiny' data-tooltip="Delete" onClick={() => this.props.handleDelete(this.props.key)} disabled={this.props.disabled}><Icon name='pencil'/></Button>
					<Button icon size='tiny' data-tooltip="Resolve" onClick={() => this.props.handleResolve(this.props.key)} disabled={this.props.disabled}><Icon name='checkmark' /></Button>
				</List.Content>
				<List.Icon name='sticky note outline' size='large' />
				<List.Content>
					<List.Header as='h4'>{this.props.note.text}</List.Header>
					<List.Description as='p'>{this.props.note.created}</List.Description>
				</List.Content>
			</List.Item>
		)
	}
}

const mapStateToProps = (state) => ({
	notes: state.selectedTicket.notes,
	UIEnabled: state.selectedTicket.UIEnabled
});

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		addNote: addNoteThunk
	}
	, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NoteContainer)