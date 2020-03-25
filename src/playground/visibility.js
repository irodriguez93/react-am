let visibility = false;

const appRoot = document.getElementById("app");

const show = () => {
  visibility = !visibility;
  render();
};

const render = () => {
  const template = (
    <div>
      <h1>Visibility Toggle</h1>
      <button onClick={show}>
        {visibility ? "Hide Details" : "Show Details"}
      </button>
      {visibility && (
        <div>
          {" "}
          <p>There are some deatials you can now see!</p>
        </div>
      )}
    </div>
  );
  ReactDOM.render(template, appRoot);
};

render();
//JSX
