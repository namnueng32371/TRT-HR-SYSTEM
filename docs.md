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

# การตั้งค่าเชื่อมต่อฐานข้อมูล (.env Config)

ค่าคอนฟิกฐานข้อมูลในไฟล์ `.env` จะต้องตั้งค่าให้ตรงตามสภาพแวดล้อมที่ใช้งาน ดังนี้:

### 1. การเชื่อมต่อผ่าน XAMPP (Local Development)

หากรันระบบปกติในเครื่องโดยใช้ฐานข้อมูลของ XAMPP ให้เปิด MySQL ใน XAMPP Control Panel แล้วปรับค่า `.env` ดังนี้:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=trt_hr_db
DB_USERNAME=root
DB_PASSWORD=            # ปล่อยเป็นค่าว่างเปล่า (เนื่องจาก MySQL ของ XAMPP ปกติไม่มีรหัสผ่าน)
```

_หมายเหตุ: อย่าลืมเข้าไปสร้างฐานข้อมูลชื่อ `trt_hr_db` ใน phpMyAdmin (เช่น http://localhost/phpmyadmin) ก่อนรันคำสั่ง `php artisan migrate`_

### 2. การเชื่อมต่อผ่าน Docker Development

หากรันระบบผ่าน Docker Containers (โดยรันบริการด้วย `docker-compose up -d`) ให้ใช้ค่าคอนฟิกในไฟล์ `.env` ดังนี้:

```env
DB_CONNECTION=mysql
DB_HOST=db              # แก้ไขจาก 127.0.0.1 เป็น db (ตามชื่อ service ใน docker-compose.yml)
DB_PORT=3306
DB_DATABASE=trt_hr_db
DB_USERNAME=root
DB_PASSWORD=root_password # ใส่รหัสผ่านให้ตรงกับ MYSQL_ROOT_PASSWORD ใน docker-compose.yml
```

_หมายเหตุ: ใน docker-compose.yml มีการ map พอร์ตภายนอกไว้ที่ 33061 (33061:3306) ทำให้สามารถใช้โปรแกรมจัดการฐานข้อมูลภายนอก (เช่น DBeaver, TablePlus, Navicat) เชื่อมต่อไปยัง Host: 127.0.0.1 Port: 33061 ได้_

### 3. การเชื่อมต่อและตั้งค่าสำหรับ CloudPanel (Production Server)

เมื่อนำโปรเจกต์ขึ้นระบบจริงบน CloudPanel ให้ใช้ค่าคอนฟิกในไฟล์ `.env` บนเซิร์ฟเวอร์ดังนี้:

```env
APP_NAME="TRT HR"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://thairubbtechconnect.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ชื่อฐานข้อมูลใน CloudPanel (เช่น thairubbtechdb)
DB_USERNAME=ชื่อผู้ใช้ใน CloudPanel (เช่น thairubbtechusr)
DB_PASSWORD="รหัสผ่านฐานข้อมูลใน CloudPanel" # เช่น "#logic1122" (ห้ามลืมฟันหนูครอบ)
```

_⚠️ ข้อควรระวังอย่างยิ่ง: หากรหัสผ่านของคุณมีอักขระพิเศษอย่างเครื่องหมาย `#` ขึ้นต้น (เช่น `#logic1122`) คุณจำเป็นต้องนำเครื่องหมายฟันหนู `"..."` มาครอบรหัสผ่านนั้นไว้เสมอ ไม่เช่นนั้นระบบ Laravel จะมองข้ามตัวหนังสือหลังจาก `#` ไปเนื่องจากคิดว่าเป็น Comment และส่งผลให้เชื่อมต่อฐานข้อมูลล้มเหลว (เกิด Error: using password: NO)_

---

# การใช้งาน ngrok สำหรับแชร์ระบบให้ UAT ทดสอบ

เมื่อต้องการแชร์เว็บแอปพลิเคชันให้บุคคลภายนอกหรือทีม UAT เข้ามาทดสอบระบบโดยรันร่วมกับ Docker ให้ปฏิบัติตามขั้นตอนดังนี้:

1. คอมไพล์ไฟล์หน้าบ้าน (React/Production build)

เปิด Terminal ทั่วไปในโฟลเดอร์โปรเจกต์ รันคำสั่งคอมไพล์ React ผ่าน Container `app` เพื่อให้เซิร์ฟเวอร์ดึงไฟล์เว็บสำเร็จรูปไปใช้ได้โดยตรง (ไม่ต้องรัน `npm run dev` ค้างไว้):

```bash
docker compose exec app npm run build
```

2. ตรวจสอบสถานะ Docker

ตรวจสอบว่าตู้ Docker ทั้งหมดของคุณเปิดใช้งานอยู่เป็นสีเขียวปกติ:

```bash
docker compose up -d
```

3. เปิดการแชร์ช่องทางด้วย ngrok

เปิด Terminal ตัวใหม่บนเครื่องคอมพิวเตอร์ของคุณ (Host) แล้วรันคำสั่งให้ ngrok ชี้ไปที่เว็บเซิร์ฟเวอร์พอร์ต 8000:

```bash
ngrok http 8000
```

คัดลอกลิงก์ HTTPS ปลายทางที่ได้รับ เช่น `https://xxxx-xxxx.ngrok-free.app`

4. อัปเดตลิงก์ในไฟล์ .env

เปิดไฟล์ `.env` แล้วแก้ไขค่า `APP_URL` ให้เป็นลิงก์ที่ได้รับจาก ngrok:

```env
APP_URL=https://xxxx-xxxx.ngrok-free.app
```

5. สั่งล้างแคชหลังบ้าน Laravel ใน Docker

รันคำสั่งนี้ใน Terminal เพื่อล้างแคช ให้ Laravel ดึงข้อมูล `APP_URL` ใหม่ที่เราแก้ไขไปใช้งานทันที:
ล้างแคชแก้ไข การตั้งค่า .env ก่อนหน้า

```bash
docker compose exec app php artisan config:clear
```

_ส่งลิงก์ดังกล่าวให้ทีม UAT เริ่มทำการทดสอบระบบได้ทันที (หากเจอหน้า Warning ของ ngrok ให้กดปุ่ม **"Visit Site"**)_

---

### ⚠️ ขั้นตอนการคืนค่าระบบเมื่อทดสอบเสร็จแล้ว

เมื่อ UAT ทำการทดสอบเสร็จสิ้นและปิด ngrok แล้ว ให้คืนค่าสำหรับการพัฒนาต่อในเครื่องดังนี้:

1. เปลี่ยน `APP_URL` ในไฟล์ `.env` กลับเป็น `http://localhost:8000`
2. รันคำสั่งเคลียร์แคชอีกครั้งใน Docker:
    ```bash
    docker compose exec app php artisan config:clear
    ```

---
