import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css'
import axios from 'axios';
import './Login.css'

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    let timer;
    if (loginMessage) {
      timer = setTimeout(() => {
        setLoginMessage('');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [loginMessage]);

const handleSignup = () => {
    navigate("/signup");
};

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      if (password.length < 6) {
        setLoginMessage("Password should be more than 5 characters");
        return;
      }

      const response = await axios.post(`https://cineplay-ltct.onrender.com/login`, { username, password });
      if (response.status === 200) {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('loginSuccess', 'Login successful');
        sessionStorage.setItem('login', true);
        navigate("/");
      } else {
        setLoginMessage('Invalid Credentials');
      }
    } catch (err) {
      console.error(err);
      setLoginMessage('Invalid Credentials');
    }
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="txt_field">
          <input type="text" {...register("username", { required: true })} />
          <span></span>
          <label>Username</label>
        </div>
        {errors.username && <p className="error">Username is required</p>}

        <div className="txt_field">
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: { value: 6, message: "Password should be more than 5 characters" }
            })}
          />
          <span></span>
          <label>Password</label>
        </div>
        {errors.password && <p className="error">{errors.password.message}</p>}
        {loginMessage && <div className="error-message">{loginMessage}</div>}

        <input type="submit" value="Login" className="button" />
        <div className="signup_link">Not a member? <Link to="/signup" onClick={handleSignup}>Signup</Link></div>
      </form>
    </div>
  );
}

export default Login;
