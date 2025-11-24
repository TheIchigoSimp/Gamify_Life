import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
         <div style={{ padding: "20px" }}>
            {/* Navbar */}
            <div 
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                    padding: "10px 0",
                    borderBottom: "1px solid #ddd"
                }}
            >
                <h2>GamifyLife Dashboard</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>

            {/* Welcome Section */}
            <h3>
                Welcome,{` `}
                <span style={{ color: "purple" }}>
                    {user?.info?.name || user?.info?.email || "Player"}
                </span>
            </h3>

            <p>Your tasks will appear here soon.</p>
        </div>
    );
}