@echo off
chcp 65001 > nul
echo === Запуск обновления GitHub Pages ===

:: Добавляем все изменения
git add .

:: Запрашиваем описание изменений у пользователя
set /p commit_msg="Что изменилось в коде? (нажми Enter, чтобы оставить 'Update'): "
if "%commit_msg%"=="" set commit_msg=Update

:: Делаем коммит
git commit -m "%commit_msg%"

:: Пушим в ветку main
echo Отправка данных на GitHub...
git push origin main

echo === Готово! Сайт обновится в течение минуты. ===
pause