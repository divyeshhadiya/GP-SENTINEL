@echo off
echo ========================================================
echo   Publishing GP-SENTINEL to GitHub (divyeshhadiya)...
echo ========================================================
git branch -M main
git remote set-url origin https://github.com/divyeshhadiya/GP-SENTINEL.git
git push -u origin main
echo.
echo Done! Check your repository at https://github.com/divyeshhadiya/GP-SENTINEL
pause
