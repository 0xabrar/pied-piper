import React, { Component } from "react";
import { Menu, Header, Icon } from "semantic-ui-react";

const dashboard = "dashboard";
const tickets = "tickets";
const applicants = "applicants";
const notes = "notes";

class Sidebar extends Component {
  state = { activeItem: "dashboard" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary vertical fluid>
        <Header as="h5" block>
          Faculty Views
        </Header>
        <Menu.Item
          name={dashboard}
          active={activeItem === dashboard}
          onClick={this.handleItemClick}
        >
          <Icon name="dashboard" />
          Dashboard
        </Menu.Item>
        <Menu.Item
          name={tickets}
          active={activeItem === tickets}
          onClick={this.handleItemClick}
        >
          <Icon name="ticket" />
          Tickets
        </Menu.Item>
        <Menu.Item
          name={applicants}
          active={activeItem === applicants}
          onClick={this.handleItemClick}
        >
          <Icon name="user" />
          Applicants
        </Menu.Item>
        <Menu.Item
          name={notes}
          active={activeItem === notes}
          onClick={this.handleItemClick}
        >
          <Icon name="sticky note" />
          Your Notes
        </Menu.Item>
      </Menu>
    );
  }
}

export default Sidebar;
