import React from 'react';

const Home = props => (
    <div>
        <h1>Home</h1>
        <p>Count: {props.count}</p>

        <p>
            <button onClick={props.increment} disabled={props.is22Incrementing}>Increment</button>
            <button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
        </p>

        <p>
            <button onClick={props.decrement} disabled={props.isDecrementing}>Decrement</button>
            <button onClick={props.decrementAsync} disabled={props.isDecrementing}>Decrement Async</button>
        </p>

        <p><button onClick={() => props.changePage()}>Go to about page via redux</button></p>
    </div>
);

export default Home;