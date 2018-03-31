import React, { PureComponent } from "react";
import { Menu, Header, Icon } from "semantic-ui-react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const dashboard = "dashboard";
const tickets = "tickets";
const applicants = "applicants";
const gapf = "gapf";

class Sidebar extends PureComponent {
  state = { activeItem: "dashboard" };
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.viewPage(name);
  };

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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      redirectLogin: () => push("/login"),
      viewPage: page => push(`/${page}`)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
