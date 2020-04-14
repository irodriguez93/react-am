import React from "react";
import AddOption from "./AddOption";
import Action from "./Action";
import Options from "./Options";
import Header from "./Header";
import OptionModal from "./OptionModal";

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = optionToRemove => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    //alert();
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option
    }));
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({
      selectedOption: undefined
    }));
  };

  handleAddOption = option => {
    if (!option) {
      return "Enter Valid Value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "Item is already in your list";
    }
    this.setState(prevState => ({
      options: prevState.options.concat([option]) //I didn't change to option because you can concat 2 arrays or a number i chose to keep the array
    }));
  };

  componentDidMount = () => {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options: options }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
      console.log("saving data");
    }
  };

  componentWillUnmount = () => {
    console.log("component will unmount");
  };

  render() {
    const title = "Indecision";
    const subtitle = "put your life in the hands of a computer";
    //   const options = ["thing one", "things two", "thing three"];
    return (
      <div className="background">
        <Header title={title} subtitle={subtitle} />
        <div className="container">
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

        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        ></OptionModal>
      </div>
    );
  }
}
