@echo off
setlocal enabledelayedexpansion

echo ================================================================
echo    GUJARAT POLICE SENTINEL 2026 - FASTAPI BACKEND LAUNCHER
echo ================================================================
echo.

cd /d "%~dp0"

:: Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] Python was not found in PATH. Checking common install paths...
    if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" (
        set "PYTHON_CMD=%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
    ) else if exist "C:\Program Files\Python312\python.exe" (
        set "PYTHON_CMD=C:\Program Files\Python312\python.exe"
    ) else (
        echo [!] Python 3.12 is required. Please install Python or restart your terminal.
        pause
        exit /b 1
    )
) else (
    set "PYTHON_CMD=python"
)

:: Create virtualenv if it doesn't exist
if not exist ".venv" (
    echo [*] Creating virtual environment in .venv...
    %PYTHON_CMD% -m venv .venv
)

:: Activate virtualenv
call .venv\Scripts\activate.bat

:: Install / verify dependencies
echo [*] Checking dependencies...
pip install -r requirements.txt --quiet

echo.
echo [*] Launching GP-SENTINEL FastAPI Server on http://localhost:8000 ...
echo [*] Interactive Swagger Docs available at http://localhost:8000/docs
echo.

uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
