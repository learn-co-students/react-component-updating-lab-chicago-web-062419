import React, { Component } from "react";

import Timer from "./Timer";
import Controls from "./Controls";

//no need to modify anything in this component
class App extends Component {
  state = {
    // Captured in an object for each timer, allowing timers to have differing intervals
    updateInterval: 1,
    timerIDs: []
  };

  componentDidMount() {
    // Adds one initial timer
    this.handleAddTimer();
  }

  render() {
    console.log(this.state.timerIDs);
    return (
      <div className="App">
        <header>
          <h1>MultiTimer</h1>
          <Controls
            // Props
            updateIntervalSetting={this.updateIntervalSetting}
            updateInterval={this.state.updateInterval}
            handleAddTimer={this.handleAddTimer}
          />
        </header>
        <div className="TimerGrid">{this.renderTimers()}</div>
      </div>
    );
  }

  // returns array of components written in JSX, mapped from this.state.timerIDs
  renderTimers = () =>
    this.state.timerIDs.map(({ id, updateInterval }) => (
      <Timer
        key={id}
        id={id}
        removeTimer={this.removeTimer}
        updateInterval={updateInterval}
      />
    ));

  // adds a random number for timer ID
  handleAddTimer = () => {
    this.setState(prevState => ({
      timerIDs: [
        ...prevState.timerIDs,
        {
          updateInterval: prevState.updateInterval,
          id: Date.now()
        }
      ]
    }));
  };

  // removeTimer updates state, removing any timer that matches the provided author
  removeTimer = id => {
    this.setState(prevState => ({
      timerIDs: prevState.timerIDs.filter(timer => timer.id !== id)
    }));
  };

  // allows us to mount multiple timers that tick at different intervals
  // Each timer component is keeping track of its own time useing the state value, time.
  updateIntervalSetting = increment => {
    this.setState(prevState => {
      if (prevState.updateInterval + increment <= 1)
        return { updateInterval: 1 };
      return {
        updateInterval: prevState.updateInterval + increment
      };
    });
  };
}

export default App;
