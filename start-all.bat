@echo off
setlocal enabledelayedexpansion

echo ====================================================================
echo      GUJARAT POLICE SENTINEL PLATFORM (UNIFIED ARCHITECTURE)
echo        Unified Statewide Video Intelligence & Multi-Dept System
echo ====================================================================
echo.

cd /d "%~dp0"

echo [*] Starting GP-SENTINEL Unified Application (Port 3000)...
start "GP-SENTINEL Application" cmd /k "npm run dev"

echo.
echo ====================================================================
echo   [OK] GP-SENTINEL Ready:
echo   - Web Application:   http://localhost:3000
echo   - Officer Login:     http://localhost:3000/login
echo   - Swagger API Docs:  http://localhost:3000/docs
echo   - Built-in APIs:     http://localhost:3000/api/cameras
echo ====================================================================
echo.
