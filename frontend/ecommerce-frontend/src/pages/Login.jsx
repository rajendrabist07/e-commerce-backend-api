import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin =
        async (e) => {

            e.preventDefault();

            try {

                const { data } =
                    await api.post(
                        "/users/login",
                        {
                            email,
                            password,
                        }
                    );

                localStorage.setItem(
                    "token",
                    data.token
                );

                navigate("/dashboard");

            } catch (error) {

                console.log(error);

            }

        };

    return (
        <form
            onSubmit={handleLogin}
        >

            <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                    setEmail(
                        e.target.value
                    )
                }
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <button>
                Login
            </button>

        </form>
    );
}

export default Login;