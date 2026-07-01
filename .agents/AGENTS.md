# Rules for TRT HR System (AI Collaborator Mode)

เมื่อคุณกำลังพัฒนาโปรเจกต์ "TRT HR System" ให้ยึดหลักเกณฑ์ดังต่อไปนี้อย่างเคร่งครัด:

## 🛠️ [ENVIRONMENT & TECH STACK]
ยึดมาตรฐานและฟีเจอร์ล่าสุดของเวอร์ชันเหล่านี้ในการเขียนโค้ดและคอนฟิก:
1. **Backend**: Laravel 13.x | PHP 8.4.22 | PHPUnit ^12.5 | MySQL 8.0 (Docker) / MySQL (XAMPP)
2. **Frontend & Stack**: Inertia.js (React) ^2.0 | React ^18.2 | Vite ^8.0 | Tailwind CSS ^4.0.0 (พร้อม `@tailwindcss/vite`) | Laravel Vite Plugin ^3.0 | Concurrently ^9.0.1

## 🔄 [DEVELOPMENT PROCESS: 6 STEPS]
การพัฒนาฟีเจอร์ต่าง ๆ ต่อจากนี้จะต้องดำเนินตามกรอบนี้เสมอ:
1. **Ask** (วิเคราะห์โจทย์/เคลียร์ Edge Cases)
2. **Plan** (วางแผนสถาปัตยกรรม/โครงสร้างฐานข้อมูล/Logic Flow)
3. **Implement** (ลงมือเขียนโค้ด)
4. **Review Diff** (ตรวจทานเฉพาะจุดที่แก้ไข)
5. **Run/Test** (ทดสอบระบบและกรณีเน็ตหลุด/ข้อมูลผิดพลาด)
6. **Commit** (บันทึกงานเข้า Git)

## 🚨 [STRICT CODE RULES]
* **Minimal Code Presentation**: แสดงเฉพาะโค้ดที่เพิ่มมาหรือแก้ไขเท่านั้น ไม่ต้องแสดงเนื้อหาทั้งไฟล์ เพื่อให้ตรวจสอบได้ง่าย
* **Thai Comments**: ต้องเขียนคอมเมนต์กำกับอธิบายในจุดที่แก้ไขหรือเพิ่มเข้ามาให้ชัดเจนเป็นภาษาไทยทุกครั้ง
* **Auto-incrementing ID**: ใช้ ID (Auto-increment) เป็น Primary Key ของฐานข้อมูลปกติ พร้อมระบุความสัมพันธ์ด้วย `foreignId` และใช้ `employee_code` (รหัสพนักงาน) เป็นค่า Unique สำหรับระบุตัวตนในเชิงธุรกิจ
* **Vite Production Assets**: เมื่อมีการแก้โค้ดฝั่ง Frontend (React, JSX, JS, CSS) ทุกครั้ง **ต้องรันคำสั่งคอมไพล์โค้ด (`npm run build` หรือ `docker compose exec app npm run build`)** ก่อน commit เสมอ เนื่องจากเซิร์ฟเวอร์ไม่มี Node.js และต้องพึ่งพาไฟล์บิลด์ใน `/public/build` ที่ส่งผ่าน Git
* **Double Quote for Special Characters in .env**: หากตั้งค่ารหัสผ่านหรือตัวแปรใน `.env` ที่มีอักขระพิเศษอย่างเครื่องหมาย `#` นำหน้า ให้ครอบด้วยเครื่องหมายฟันหนู `"..."` เสมอ เพื่อป้องกันระบบมองข้ามข้อความหลัก
