class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: []
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options: options }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
      console.log("saving data");
    }
  }

  componentWillUnmount() {
    console.log("component will unmount");
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    alert(this.state.options[randomNum]);
  }
  handleAddOption(option) {
    if (!option) {
      return "Enter Valid Value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "Item is already in your list";
    }
    this.setState(prevState => ({
      options: prevState.options.concat([option]) //I didn't change to option because you can concat 2 arrays or a number i chose to keep the array
    }));
  }
  render() {
    const title = "Indecision";
    const subtitle = "put your life in the hands of a computer";
    //   const options = ["thing one", "things two", "thing three"];
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          handleDeleteOption={this.handleDeleteOption}
          handleDeleteOptions={this.handleDeleteOptions}
          options={this.state.options}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}



const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};

Header.defaultProps = {
  title: "Indecision"
};

const Action = props => {
  return (
    <div>
      <button disabled={!props.hasOptions} onClick={props.handlePick}>
        What should I do?
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      {props.options.length === 0 && <p>Please add an option to get Started</p>}
      <button onClick={props.handleDeleteOptions}> Remove All </button>
      {props.options.map(option => (
        <Option
          handleDeleteOption={props.handleDeleteOption}
          key={option}
          optionText={option}
        ></Option>
      ))}
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();

    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error: error }));
    if (!error) {
      e.target.elements.option.value = "";
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option"></input>
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

const Option = props => {
  return (
    <div>
      {" "}
      {props.optionText}
      <button
        onClick={e => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        Remove Option
      </button>
    </div>
  );
};

// const User = props => {
//   return (
//     <div>
//       <p>Name: {props.name}</p>
//       <p>Age: {props.age}</p>
//     </div>
//   );
// };
// <User name="Irving" age="26"></User>,

ReactDOM.render(
  <IndecisionApp></IndecisionApp>,
  document.getElementById("app")
);
