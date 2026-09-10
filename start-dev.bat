@echo off
echo ========================================================
echo        Starting GP-SENTINEL Platform (Next.js)
echo ========================================================
echo.
echo [1/1] Starting Next.js Command Platform on http://localhost:3000...
start "GP-SENTINEL Platform" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ========================================================
echo  GP-SENTINEL is launching!
echo  Platform: http://localhost:3000
echo ========================================================
