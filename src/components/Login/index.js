import React from 'react';

import './login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('authLogin')) {
      this.props.history.push('/');
    }
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { username, password, errMsg } = this.state;

    if (!username || !password) {
      errMsg = 'Required!!';
    } else if (username === 'admin' && password === 'admin') {
      localStorage.setItem('authLogin', true);
      this.props.history.push('/');
    } else {
      errMsg = 'Wrong Username or Password'
    }
    this.setState({
      errMsg,
    });
  }
  
  render() {
    console.log(this.props)
    const { username, password, errMsg } = this.state;
    return (
      <div className="container">
        <h2>Welcome!!</h2>
        <h4>Login</h4>
        {errMsg && <p>{errMsg}</p>}
        <form onSubmit={this.handleSubmit}>
          <div className="padding">
            <input type="text" name="username" placeHolder="Username" value={username} onChange={this.handleInput} />
          </div>
          <div className="padding">
            <input type="password" name="password" placeHolder="******" value={password} onChange={this.handleInput} />
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
};

export default Login;
