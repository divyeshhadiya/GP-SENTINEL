@echo off
setlocal enabledelayedexpansion

echo ====================================================================
echo      GUJARAT POLICE SENTINEL PLATFORM (HYBRID ARCHITECTURE)
echo        Unified Statewide Video Intelligence & Multi-Dept System
echo ====================================================================
echo.

cd /d "%~dp0"

echo [*] Starting Python FastAPI Backend (Port 8000)...
start "GP-SENTINEL FastAPI Backend" cmd /k "cd backend && call run.bat"

echo [*] Waiting 3 seconds for Backend API to initialize...
timeout /t 3 /nobreak >nul

echo [*] Starting Next.js Frontend (Port 3000)...
start "GP-SENTINEL Next.js Web" cmd /k "npm run dev"

echo.
echo ====================================================================
echo   [OK] Services Launching:
echo   - Frontend Portal:  http://localhost:3000
echo   - Officer Login:    http://localhost:3000/login
echo   - FastAPI Backend:  http://localhost:8000
echo   - Swagger API Docs: http://localhost:8000/docs
echo ====================================================================
echo.
