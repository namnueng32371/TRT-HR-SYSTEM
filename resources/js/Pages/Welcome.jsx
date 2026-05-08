import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="fixed inset-0 h-screen w-screen object-cover"
                    src="/images/background.webp"
                />
                <div className="relative flex h-screen flex-col items-center justify-center text-black border border-red-800">
                    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border">
                        {/* Title */}
                        <h1 className="text-center text-xl font-bold mb-6">
                            ระบบรวมศูนย์ข้อมูลพนักงาน
                        </h1>

                        {/* Username */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">
                                ชื่อผู้ใช้
                            </label>
                            <input
                                type="text"
                                placeholder="ใส่ชื่อผู้ใช้ของคุณ"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <label className="block mb-1 font-medium">
                                รหัสผ่าน
                            </label>
                            <input
                                type="password"
                                placeholder="ใส่รหัสผ่านของคุณ"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Button */}
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                            เข้าสู่ระบบ
                        </button>

                        {/* Footer Text */}
                        <p className="text-center text-sm text-gray-500 mt-4">
                            ยังไม่มีบัญชี? ติดต่อเจ้าหน้าที่ฝ่ายบุคคล
                        </p>
                    </div>
                    <header className="py-10">
                        <nav className="flex flex-1 justify-center border border">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>
                </div>
            </div>
        </>
    );
}
