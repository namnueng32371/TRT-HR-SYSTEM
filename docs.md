# ถ้าจะรัน dev mode ต้องเปิด 2 อย่าง

-รัน npm run dev ใน bash vite
-รัน php artisan serve ใน bash run backend \*\*\*ต้องไปเปิด XAMPP ด้วย

# เปิดใช้งาน CLI gemini

-node gemini_cli.mjs resources/js/Pages/Welcome.jsx "รีวิวโค้ดชุดนี้หน่อย"

# สิ่งที่มีสำหรับ Laravel framework (Tech Stack & Prerequisites)

1. PHP (v8.4.22)
2. Composer (v2.9.5)
3. Node.js (v24.6.0) & npm (v11.5.1)
4. MySQL Database (XAMPP / Docker MySQL v8.0)
5. Laravel Framework (v13.5.0)
6. React (v18.3.1) & Vite (v8.0.9)
7. Inertia.js (v2.3.21 - `@inertiajs/react`)
8. Tailwind CSS (v3.4.19 & `@tailwindcss/vite` v4.2.2)

# ขั้นตอนการการสร้างโปรเจกต์ Laravel

1. composer create-project laravel/laravel trt-hr //สร้างโปรเจค
2. composer require laravel/breeze --dev //ช่วยสร้างระบบ login/register
3. php artisan breeze:install react // ติดตั้ง View เป็น React โดย Vite
4. npm install ดาวน์โหลดไฟล์สำคัญๆ 


