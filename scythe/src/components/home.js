import React from "react";
import PropTypes from "prop-types";

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>Count: {props.count}</p>

    <p>
      <button onClick={props.increment} disabled={props.isIncrementing}>
        Increment
      </button>
      <button onClick={props.incrementAsync} disabled={props.isIncrementing}>
        Increment Async
      </button>
    </p>

    <p>
      <button onClick={props.decrement} disabled={props.isDecrementing}>
        Decrement
      </button>
      <button onClick={props.decrementAsync} disabled={props.isDecrementing}>
        Decrement Async
      </button>
    </p>

    <p>
      <button onClick={() => props.changePage()}>
        Go to about page via redux
      </button>
    </p>
  </div>
);

Home.propTypes = {
  count: PropTypes.number,
  increment: PropTypes.func,
  incrementAsync: PropTypes.func,
  decrement: PropTypes.func,
  decrementAsync: PropTypes.func,
  isIncrementing: PropTypes.bool,
  isDecrementing: PropTypes.bool,
  changePage: PropTypes.func
};

export default Home;
