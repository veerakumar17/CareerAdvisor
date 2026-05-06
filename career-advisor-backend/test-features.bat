@echo off
echo ========================================
echo Testing Advanced Career Features
echo ========================================
echo.

echo 1. Testing Search...
curl "http://localhost:5000/api/careers?search=engineer"
echo.
echo.

echo 2. Testing Filter by Skill...
curl "http://localhost:5000/api/careers?skill=React"
echo.
echo.

echo 3. Testing Pagination...
curl "http://localhost:5000/api/careers?page=1&limit=3"
echo.
echo.

echo 4. Testing Skill Match...
curl -X POST http://localhost:5000/api/careers/match -H "Content-Type: application/json" -d "{\"userSkills\":[\"JavaScript\",\"React\"]}"
echo.
echo.

echo ========================================
echo All tests complete!
echo ========================================
pause
