<?php
$connection = mysqli_connect('localhost', 'root', 'bDqtW6GyZ1', 'vk_mini_app');
$connection->set_charset("utf8");

if (mysqli_connect_errno()) {
    echo 'Ошибка в подключении к базе данных (' . mysqli_connect_errno() . '): ' . mysqli_connect_error();
    exit();
}

