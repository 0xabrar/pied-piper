import React, { PureComponent } from "react";
import { Menu, Header, Icon } from "semantic-ui-react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUserState } from "../reducers";
import {
  ASSOCIATE_CHAIR,
  BUDGET_DIRECTOR,
  FACULTY_USER,
  GRAD_STAFF
} from "../constants/users";

const dashboard = "dashboard";
const tickets = "tickets";
const faculty = "faculty";
const applicants = "applicants";
const gapf = "gapf";

const getType = user => {
  switch (user) {
    case "BUDGET_DIRECTOR":
      return "Budget Director View";
    case "FACULTY":
      return "Faculty View";
    case "ASSOCIATE_CHAIR":
      return "Associate Chair View";
    case "GRAD_STAFF":
      return "Grad Office Staff View";
    default:
      return "Menu";
  }
};

class Sidebar extends PureComponent {
  state = { activeItem: "dashboard" };
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.viewPage(name);
    console.log(this.props.url);
  };

  render() {
    const { activeItem } = this.state;
    if (
      this.props.user == BUDGET_DIRECTOR ||
      this.props.user === GRAD_STAFF ||
      this.props.user === ASSOCIATE_CHAIR
    ) {
      return (
        <Menu secondary vertical fluid>
          <Header as="h5" block>
            {/* TODO: Update this */}
            {getType(this.props.user)}
          </Header>
          <Menu.Item name={dashboard} onClick={this.handleItemClick}>
            <Icon name="dashboard" />
            Dashboard
          </Menu.Item>
          <Menu.Item name={tickets} onClick={this.handleItemClick}>
            <Icon name="ticket" />
            Tickets
          </Menu.Item>
          <Menu.Item name={faculty} onClick={this.handleItemClick}>
            <Icon name="user" />
            Faculty
          </Menu.Item>
          <Menu.Item name={applicants} onClick={this.handleItemClick}>
            <Icon name="user" />
            Applicants
          </Menu.Item>
          <Menu.Item name={gapf} onClick={this.handleItemClick}>
            <Icon name="sticky note" />
            GAPF
          </Menu.Item>
        </Menu>
      );
    } else if (this.props.user == FACULTY_USER) {
      return (
        <Menu secondary vertical fluid>
          <Header as="h5" block>
            {/* TODO: Update this */}
            {getType(this.props.user)}
          </Header>
          <Menu.Item name={dashboard} onClick={this.handleItemClick}>
            <Icon name="dashboard" />
            Dashboard
          </Menu.Item>
          <Menu.Item name={tickets} onClick={this.handleItemClick}>
            <Icon name="ticket" />
            Tickets
          </Menu.Item>
          <Menu.Item name={applicants} onClick={this.handleItemClick}>
            <Icon name="user" />
            Applicants
          </Menu.Item>
          <Menu.Item name={gapf} onClick={this.handleItemClick}>
            <Icon name="sticky note" />
            GAPF
          </Menu.Item>
        </Menu>
      );
    }
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
