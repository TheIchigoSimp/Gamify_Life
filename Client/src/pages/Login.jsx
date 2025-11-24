import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    //Form state
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    //Feedback message
    const [ error, setError ] = useState("");
    const [ success, setSuccess ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{

            if(!email || !password){
                setError("All fields are required");
                return;
            }

            const res = await axiosClient.post("/auth/login", {
                email,
                password,
            });

            //Store user token in context and localStorage
            setUser({
                token: res.data.token,
                info: res.data.user
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            //Redirect to dashboard
            setSuccess("Login successful! Redirecting to dashboard...");
            
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err) {
            const msg = err.response?.data?.message || "Login failed";
            setError(msg);
        }
    };

return (
    <div style={{ width: "300px", margin: "60px auto" }}>
            <h2>Login</h2>

            {/* TODO: display error */}
            { error && <div style={{ color: "red", marginBottom: "10px" }}>{ error }</div> }

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}