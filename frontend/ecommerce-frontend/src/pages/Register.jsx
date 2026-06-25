function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center">

            <div
                className="
        backdrop-blur-xl
        bg-white/10
        border border-white/20
        shadow-2xl
        rounded-3xl
        p-8
        w-[420px]
      "
            >

                <h1 className="text-4xl font-bold mb-6">
                    Create Account
                </h1>

                <input
                    placeholder="Name"
                    className="
            w-full
            p-4
            rounded-2xl
            bg-white/10
            border
            border-white/20
            mb-4
          "
                />

                <input
                    placeholder="Email"
                    className="
            w-full
            p-4
            rounded-2xl
            bg-white/10
            border
            border-white/20
            mb-4
          "
                />

                <input
                    placeholder="Password"
                    type="password"
                    className="
            w-full
            p-4
            rounded-2xl
            bg-white/10
            border
            border-white/20
            mb-4
          "
                />

                <button
                    className="
          w-full
          py-4
          rounded-2xl
          bg-white
          text-black
          font-semibold
          "
                >
                    Register
                </button>

            </div>

        </div>
    );
}

export default Register;