import React from 'react'
import { Header, List, Button, Icon } from 'semantic-ui-react'

class NoteContainer extends React.Component {
  render() {
    return (
      <List divided relaxed verticalAlign='middle'>
				<Header as='h2'>Notes</Header>
        {this.props.notes.map((note, i) => {
          return (<Note key={i} />)
        })}
      </List>
    )
  }
}

class Note extends React.Component {
  render() {
    return (
      <List.Item>
				<List.Content floated='right'>
					<Button icon size='tiny' data-tooltip="Edit"><Icon name='pencil' /></Button>
					<Button icon size='tiny' data-tooltip="Delete"><Icon name='cancel' /></Button>
					<Button icon size='tiny' data-tooltip="Resolve"><Icon name='checkmark' /></Button>
				</List.Content>
				<List.Icon name='sticky note outline' size='large' />
				<List.Content>
					<List.Header as='h4'>This is an example note.</List.Header>
					<List.Description as='p'>Created 10/10/2010 @ 10:39am</List.Description>
				</List.Content>
			</List.Item>
    )
  }
}

export default NoteContainer