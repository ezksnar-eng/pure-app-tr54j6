package com.example.appcustomizer

import android.content.Intent
import android.content.pm.PackageManager
import android.content.pm.ShortcutInfo
import android.content.pm.ShortcutManager
import android.graphics.drawable.Icon
import android.os.Build
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val edtPackage = findViewById<EditText>(R.id.edtPackageName)
        val edtNewName = findViewById<EditText>(R.id.edtNewName)
        val btnCreate = findViewById<Button>(R.id.btnCreateShortcut)

        btnCreate.setOnClickListener {
            val packageName = edtPackage.text.toString().trim() // مثل: com.google.android.youtube
            val newName = edtNewName.text.toString().trim()

            if (packageName.isNotEmpty() && newName.isNotEmpty()) {
                createAppShortcut(packageName, newName)
            } else {
                Toast.makeText(this, "اكتب اسم الحزمة والاسم الجديد!", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun createAppShortcut(targetPackage: String, customName: String) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val shortcutManager = getSystemService(ShortcutManager::class.java)
            if (shortcutManager!!.isRequestPinShortcutSupported) {

                // جلب Intent التطبيق الحقيقي المراد فتحه
                val launchIntent = packageManager.getLaunchIntentForPackage(targetPackage)
                if (launchIntent == null) {
                    Toast.makeText(this, "هذا التطبيق غير مثبت بجهازك!", Toast.LENGTH_SHORT).show()
                    return
                }

                // تقدر تخلي هنا أيقونة مخصصة من ملفات الـ drawable
                val icon = Icon.createWithResource(this, R.mipmap.ic_launcher)

                val shortcutInfo = ShortcutInfo.Builder(this, "shortcut_$targetPackage")
                    .setShortLabel(customName)
                    .setLongLabel(customName)
                    .setIcon(icon)
                    .setIntent(launchIntent)
                    .build()

                shortcutManager.requestPinShortcut(shortcutInfo, null)
                Toast.makeText(this, "تم طلب إضافة الاختصار للشاشة الرئيسية!", Toast.LENGTH_SHORT).show()
            }
        } else {
            Toast.makeText(this, "إصدار الأندرويد لا يدعم هذه الميزة.", Toast.LENGTH_SHORT).show()
        }
    }
}
