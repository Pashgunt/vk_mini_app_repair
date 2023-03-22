<?php
$connection = mysqli_connect('mysql', 'user', 'user', 'beboss_trial');
$connection->set_charset("utf8");

if (mysqli_connect_errno()) {
    echo 'Ошибка в подключении к базе данных (' . mysqli_connect_errno() . '): ' . mysqli_connect_error();
    exit();
}
