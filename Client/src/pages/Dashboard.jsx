import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Tasks from "./Tasks";

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* ---------- Sidebar ---------- */}
            <div
                style={{
                    width: "220px",
                    background: "#f3f3f3",
                    padding: "20px",
                    borderRight: "1px solid #ddd"
                }}
            >
                <h2>GamifyLife</h2>

                <div style={{ marginTop: "40px" }}>
                    <p><strong>User:</strong></p>
                    <p style={{ color: "purple" }}>
                        {user?.info?.name || user?.info?.email}
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: "60px",
                        padding: "10px",
                        width: "100%",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            </div>

            {/* ---------- Main Content ---------- */}
            <div style={{ flex: 1, padding: "30px" }}>
                <h2>Dashboard</h2>
                <p>Welcome back, {user?.info?.name || "Player"} 👋</p>

                {/* Tasks Section */}
                <div style={{ marginTop: "40px" }}>
                    <Tasks />
                </div>
            </div>
        </div>
    );
}
