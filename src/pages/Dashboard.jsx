import { logout } from "../config/firebase";

const Dashboard = () => {
    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="container">
            <h1>Bienvenido al Dashboard 🔥 </h1>
                <p>
                    Esto es un ejemplo de ruta protegida.
                </p>
            <button onClick={handleLogout}>LogOut</button>
            </div>
        </>
    );
};

export default Dashboard;
