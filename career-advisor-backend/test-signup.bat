@echo off
echo ========================================
echo Testing Signup API
echo ========================================
echo.
echo Testing POST /api/auth/register...
echo.

curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"

echo.
echo.
echo ========================================
echo If you see a token in the response above,
echo signup is working correctly!
echo ========================================
pause
