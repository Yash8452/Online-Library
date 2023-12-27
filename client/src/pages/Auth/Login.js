import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/auth'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:5050/api/v1/auth/login", {
            username,
            password,
          });
          if (res && res.data.success) {
            toast.success(res.data && res.data.message,{
                duration: 5000
            });
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state || "/");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };

    return (
        <Layout>
            <div className="form-container " style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN FORM</h4>

                    <div className="mb-3">
                        <input
                            type="text"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Username "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    

                    <button type="submit" className="btn btn-primary">
                        LOGIN
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Login