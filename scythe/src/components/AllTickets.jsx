import React from 'react'
import SearchableTable from '../containers/searchableTable'
import { Header } from 'semantic-ui-react'

export default class AllTickets extends React.Component{
  render() {
    return (
      <div>
        <Header as='h2'>All Tickets</Header>
        <SearchableTable />
      </div>
    )
  }
}