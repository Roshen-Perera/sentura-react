import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState();
  const [address, setAddress] = useState();  
  const [email, setEmail] = useState();

  

  return (
    <>
      <form className="container mt-5">
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="inputName" />
        </div>
        <div className="mb-3">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input type="text" className="form-control" id="inputAddress" />
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
