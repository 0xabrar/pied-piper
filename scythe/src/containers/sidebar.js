import React, { PureComponent } from "react";
import { Menu, Header, Icon } from "semantic-ui-react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {getUserState} from "../reducers";

const dashboard = "dashboard";
const tickets = "tickets";
const applicants = "applicants";
const gapf = "gapf";

const getType = (user) => {
  switch(user) {
    case 'BUDGET_DIRECTOR':
      return 'Budget Director View'
    case 'FACULTY':
      return 'Faculty View'
    case 'ASSOCIATE_CHAIR':
      return 'Associate Chair View'
    case 'GRAD_STAFF':
      return 'Grad Office Staff View'
    default:
      return 'Menu'
  }

}

class Sidebar extends PureComponent {
  state = { activeItem: "dashboard" };
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.viewPage(name);
    console.log(this.props.url)
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary vertical fluid>
        <Header as="h5" block>
          { /* TODO: Update this */ }
          {getType(this.props.user)}
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
          name={gapf}
          active={activeItem === gapf}
          onClick={this.handleItemClick}
        >
          <Icon name="sticky note" />
          GAPF
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state, router) => ({
  url: router.location,
  user: getUserState(state).user.type
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      redirectLogin: () => push("/login"),
      viewPage: page => push(`/${page}`)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
