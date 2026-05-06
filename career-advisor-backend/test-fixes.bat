@echo off
echo ========================================
echo TESTING FIXES - USER SKILLS & CAREERS
echo ========================================
echo.

echo [1/3] Testing Careers Collection...
echo.
curl -X GET http://localhost:5000/api/careers
echo.
echo.

echo [2/3] Testing User Registration with Skills...
echo.
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\",\"skills\":[\"JavaScript\",\"React\"],\"interests\":[\"Web Dev\"],\"education\":\"undergraduate\"}"
echo.
echo.

echo [3/3] Testing Login...
echo.
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\"}"
echo.
echo.

echo ========================================
echo TESTS COMPLETE
echo ========================================
echo.
echo Check the responses above:
echo - Careers should show 8 career objects
echo - Register should return user with skills array
echo - Login should return user with skills array
echo.
pause
