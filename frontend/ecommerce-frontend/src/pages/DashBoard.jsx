import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

    const [user, setUser] =
        useState(null);

    useEffect(() => {

        const fetchProfile =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const { data } =
                        await api.get(
                            "/users/profile",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`,
                                },
                            }
                        );

                    setUser(data.user);

                } catch (error) {

                    console.log(error);

                }

            };

        fetchProfile();

    }, []);

    return (
        <div >

            <h1>
                Dashboard
            </h1>

            {user && (
                <>
                    <h2>
                        {user.name}
                    </h2>

                    <p>
                        {user.email}
                    </p>

                    <p>
                        {user.role}
                    </p>
                </>
            )}

        </div>
    );
}

export default Dashboard;