<?php
require_once __DIR__ . "/functions/functions.php";

header('Content-Type: application/json');

$postData = json_decode(file_get_contents("php://input"), 1);

if (empty($postData['secret'])) echo json_encode(['result' => 'error']);

switch ($postData['action']) {
    case "get_user_devices":
        echo getUserDevices($postData);
        break;
    case "get_devices":
        echo getDevices($postData);
        break;
    case "add_user_device":
        echo addUserDevice($postData);
        break;
    case "delete_user_device":
        echo removeUserDevice($postData);
        break;
    case "create_repair_request":
        echo createRequestForRepairDevice($postData);
        break;
    case "get_repair_request":
        echo getRequestsForRepairDevice($postData);
        break;
    case "send_message_chat":
        echo sendMessageToChat($postData);
        break;
    case "get_messages_for_user":
        echo getMessagesForUser($postData);
        break;
    case "get_crashed_tests_for_user":
        echo getCrashedTestsForUser($postData);
        break;
    case "create_crashed_test_for_user":
        echo createCrashedTestForUser($postData);
        break;
    case "update_crashed_test_for_user":
        echo updateCrashedTestsForUser($postData);
        break;
    default:
        echo json_encode(['result' => 'error']);
        break;
}
