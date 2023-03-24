<?php
require_once __DIR__ . "/../functions/functions.php";

if (empty($_POST) || empty($_POST)) die;

if (!$_GET['action']) die;

if ($_GET['key'] !== 'O1KJTS9518') die;

if ($_GET['action'] === "send_new_incoming") {
    if (isset(
        $_POST['user_id'],
        $_POST['message'],
        $_POST['type_message'],
    )) {
        $userID = $_POST['user_id'];
        $message = $_POST['message'];
        $typeMessage = $_POST['type_message'];
        $execution = true;
    } else {
        $error_code = '002_001-erp';
        $error_text = 'no data';
        $execution = false;
    }

    if ($execution) {
        $dataForInsert = [
            'user_id' => $userID,
            'message' => $message,
            'type_message' => $typeMessage
        ];
        $result = queryExec(queryInsertBuilder('vk_mini_app_chat_messages', $dataForInsert));
        if (!$result) {
            $error_code = '002_001-erp';
            $error_text = 'no data';
            $execution = false;
        }
    }

    if ($execution) {
        $response = array(
            'result' => 'ok'
        );
    } else {
        $response = array(
            'result' => 'error',
            'error_code' => $error_code,
            'error_text' => $error_text
        );
    }

    echo json_encode($response);
}
