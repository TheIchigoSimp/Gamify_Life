import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function Register() {
    const navigate = useNavigate();

    //Form state
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    //Feedback message
    const [ error, setError ] = useState("");
    const [ success, setSuccess ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try{
            if(!name || !email || !password || !confirmPassword){
                setError("All fields are required");
                return;
            }

            if(password !== confirmPassword){
                setError("Passwords do not match");
                return;
            }

            const res = await axiosClient.post("auth/register", {
                name,
                email,
                password
            });

            setSuccess("Registration successful! Redirecting to login...");
            
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            // backend sends errors as: { message: "..." }
            const msg = err.response?.data?.message || "Registration failed";
            setError(msg);
        }
    };

    return (
        <div style={{ width: "300px", margin: "60px auto" }}>
            <h2>Create Account</h2>

            {/* Feedback Messages */}
            { error && <div style={{ color: "red", marginBottom: "10px" }}>{ error }</div> }
            { success && <div style={{ color: "green", marginBottom: "10px" }}>{ success }</div> }

            <form onSubmit={ handleSubmit }>
                <input type="text" 
                placeholder="Name" 
                value={name} onChange={(e) => setName(e.target.value)} />

                <input type="email" 
                placeholder="Email" 
                value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" 
                placeholder="Password" 
                value={password} onChange={(e) => setPassword(e.target.value)} />

                <input type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}