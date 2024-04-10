import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/.test(password)) {
        setSignupError("Password must contain at least one letter, one number, and one special character");
        return;
      }

  
      const response = await axios.post(`https://cineplay-ltct.onrender.com/signup`, { username, password });
      if (response.status === 201) {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('login', true);
        sessionStorage.setItem('signupSuccess', 'Signup successful');
        navigate("/");
        window.location.href = "/";
      } else {
        setSignupError('Signup failed');
      }
    } catch (err) {
      console.error(err);
      setSignupError('An error occurred during the signup');
    }
  };

  return (
    <div className="center">
      <h1>Signup</h1>
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
        {signupError && <p className="error">{signupError}</p>}

        <input type="submit" value="Signup" className="button" />
        <div className="signup_link">Alredy a member? <Link to="/login" onClick={handleLogin}>Login</Link></div>
      </form>
    </div>
  );
}

export default Signup;
