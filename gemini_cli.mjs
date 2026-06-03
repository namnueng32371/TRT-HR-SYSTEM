import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// อย่าลืมใส่ API KEY ของคุณตรงนี้นะครับ (แนะนำให้ไปสร้าง Key ใหม่ในระบบด้วยน้า เพราะอันเก่าติดมาในแชทแล้วครับ)
const genAI = new GoogleGenerativeAI("AIzaSyAqvHUewuJobWOt9Y0qJGEqyq12mMHk0n8");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// ฟังก์ชันสแกนโฟลเดอร์และข้ามไฟล์ขยะของ Laravel / React
function getProjectStructure(
    dir,
    ignoreDirs = [
        "node_modules",
        "vendor",
        ".git",
        "dist",
        "build",
        "storage",
        "bootstrap",
        "public",
    ],
) {
    let structure = "";

    function walk(currentDir, indentLevel) {
        let files;
        try {
            files = fs.readdirSync(currentDir);
        } catch (e) {
            return;
        }

        for (const file of files) {
            if (ignoreDirs.includes(file)) continue;

            const fullPath = path.join(currentDir, file);
            try {
                const stats = fs.statSync(fullPath);
                const indent = "    ".repeat(indentLevel);

                if (stats.isDirectory()) {
                    structure += `${indent}${file}/\n`;
                    walk(fullPath, indentLevel + 1); // สแกนลึกลงไป
                } else {
                    structure += `${indent}${file}\n`;
                }
            } catch (e) {
                continue;
            }
        }
    }

    walk(dir, 0);
    return structure;
}

// ฟังก์ชันสำหรับส่งโครงสร้างโปรเจ็กต์ให้ Gemini วิเคราะห์
async function analyzeArchitecture(targetPath, customPrompt) {
    console.log(`กำลังสแกนเป้าหมาย: ${targetPath}...`);
    let targetData = "";
    try {
        // เพิ่ม: เช็กว่าเป้าหมายคือไฟล์ (เช่น .jsx) หรือโฟลเดอร์
        const stats = fs.statSync(targetPath);
        if (stats.isFile()) {
            // เพิ่ม: ถ้าเป็นไฟล์ ให้อ่าน "เนื้อหาโค้ด" ทั้งหมดในไฟล์นั้น
            targetData = fs.readFileSync(targetPath, "utf-8");
        } else {
            // คงเดิม: ถ้าเป็นโฟลเดอร์ ให้อ่านเป็น Tree
            targetData = getProjectStructure(targetPath);
        }
    } catch (e) {
        console.error("ไม่พบไฟล์หรือโฟลเดอร์ที่ระบุ:", targetPath);
        return;
    }

    // แก้ไข: ดึงตัวแปร targetData ที่อ่านเนื้อหามาแล้ว ส่งให้ AI
    const prompt = customPrompt
        ? `วิเคราะห์และจัดการตามคำสั่งต่อไปนี้: "${customPrompt}"\n\nข้อมูลโครงสร้าง/ไฟล์:\n${targetData}`
        : `นี่คือโครงสร้างไฟล์ทั้งหมดในโปรเจ็ค... (ข้อความคำสั่งเดิมของคุณ)...`;

    console.log("กำลังส่งข้อมูลให้ Gemini วิเคราะห์... รอสักครู่ครับ\n");
    try {
        const result = await model.generateContent(prompt);
        console.log("================ ผลการวิเคราะห์ ================\n");
        console.log(result.response.text());
        console.log("\n=============================================");
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการเชื่อมต่อ:", error.message);
    }
}

// แก้ไข: เปลี่ยนวิธีรับค่าเป็น slice(3).join(" ") เพื่อให้รับคำสั่ง Prompt ยาวๆ ที่มีเว้นวรรคได้โดยไม่ต้องใส่ ""
const targetDir = process.argv[2] || ".";
const userPrompt = process.argv.slice(3).join(" ");
analyzeArchitecture(targetDir, userPrompt);
