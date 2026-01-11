@echo off
chcp 65001 > nul
echo === Запуск обновления GitHub Pages ===

:: Добавляем все изменения
git add .

:: Запрашиваем описание изменений
set /p commit_msg="Что изменилось в коде? (нажми Enter, чтобы оставить 'Update'): "
if "%commit_msg%"=="" set commit_msg=Update

:: Делаем коммит
git commit -m "%commit_msg%"

:: Пробуем обычный пуш
echo Отправка данных на GitHub...
git push origin main

:: Проверка на ошибку
if %errorlevel% neq 0 (
    echo.
    echo [!] Ошибка: Не удалось отправить данные (возможно, файлы на GitHub отличаются).
    set /p force="Хотите сделать ПРИНУДИТЕЛЬНУЮ отправку (с заменой)? (y/n): "
    if /i "%force%"=="y" (
        echo Отправка с флагом --force...
        git push origin main --force
    ) else (
        echo Отмена. Попробуйте сначала сделать 'git pull'.
    )
)

echo.
echo === Завершено! ===
pause