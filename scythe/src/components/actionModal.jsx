import React from 'react'
import { Modal, Table, Button, Header } from 'semantic-ui-react'


// Props: button, headers, options, submit, title
class ActionModal extends React.Component{
  render() {
    return (
      <Modal basic size='fullscreen'  open={this.props.open}>
        <Header icon='edit' content={this.props.title} />
        <Modal.Content>
          <Table celled>
            <Table.Header>
              <Table.Row>
                {this.props.headers.map((header, i) => <Table.HeaderCell key={i}>{header}</Table.HeaderCell>)}
                <Table.HeaderCell>Select</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.options.map((opt, i) => <ModalTableRow key={i} data={opt} ticket={this.props.ticket} action={this.props.action} close={this.props.close}/>)}
            </Table.Body>
          </Table>
        </Modal.Content>
      </Modal>
    )
  }
}

class ModalTableRow extends React.Component {
  constructor(props){
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(e){
    if(this.props.data.applicantId){
      // Asign applicant
      this.props.action(this.props.ticket.ticketId, this.props.applicantId)
    } else if (this.props.data.facultyId){
      // Assign faculty
      this.props.action(this.props.ticketId, this.props.facultyId)
    } else {
      console.log('Error closing modal...')
    }
    this.props.close()
  }
  render () {
    return (
      <Table.Row>
        {Object.values(this.props.data).map((item, i) => <Table.Cell key={i}>{item}</Table.Cell>)}
        <Table.Cell><Button onClick={this.handleSelect}>Select</Button></Table.Cell>
      </Table.Row>
    )
  }

}

export default ActionModal