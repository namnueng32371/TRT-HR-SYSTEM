import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="เข้าสู่ระบบ" />

            <div className="relative flex h-screen flex-col items-center justify-center text-black">
                {/* Background */}
                <img
                    className="fixed inset-0 h-screen w-screen object-cover"
                    src="/images/background.webp"
                    onError={(e) => e.target.classList.add("hidden")}
                />

                {/* Card */}
                <div className="relative bg-white p-8 rounded-2xl shadow-md w-full max-w-md border">
                    {/* Title */}
                    <h1 className="text-center text-2xl font-bold mb-6">
                        ระบบรวมศูนย์ข้อมูลพนักงาน
                    </h1>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        {/* Email */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block mb-1 font-medium"
                            >
                                อีเมล
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="ใส่อีเมลของคุณ"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block mb-1 font-medium"
                            >
                                รหัสผ่าน
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="ใส่รหัสผ่านของคุณ"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Remember me */}
                        <div className="mb-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="text-sm text-gray-600">
                                    จดจำฉันไว้
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-[50px] bg-[#B3702A] text-white font-light tracking-wide rounded-md
                                       hover:bg-[#9a5f23] transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {processing ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </button>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-sm text-gray-500">
                                ยังไม่มีบัญชี?{" "}
                                <Link
                                    href={route("register")}
                                    className="text-black underline pl-1"
                                >
                                    ติดต่อเจ้าหน้าที่ฝ่ายบุคคล
                                </Link>
                            </p>

                            {/* {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-gray-500 underline hover:text-gray-800"
                                >
                                    ลืมรหัสผ่าน?
                                </Link>
                            )} */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
