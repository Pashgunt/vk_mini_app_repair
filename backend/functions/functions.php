<?php
require_once __DIR__ . "/../db/query_functions.php";

function getUserDevices($postData)
{
    if (isset($postData['user_id'])) {
        $userID = $postData['user_id'];
        $execution = true;
    } else {
        $result['status'] = "error";
        $execution = false;
    }

    if ($execution) {
        $result = [
            'status' => 'ok',
            'data' => [],
        ];
        $result['data'] = queryResult(querySelectBuilder(
            'vk_mini_app_devices_for_user',
            '`devices`.`device`, `device_type`.`device_type`',
            [
                ['=', '`vk_mini_app_devices_for_user`.`is_actual`', 1],
                ['=', '`vk_mini_app_devices_for_user`.`user_id`', $userID],
            ],
            [],
            null,
            null,
            [
                ['inner', 'vk_mini_app_devices', 'id' => 'device_id'],
                ['inner', 'vk_mini_app_device_types', 'id' => 'device_type_id'],
            ]
        ));
    }

    return json_encode($result);
}

function getDevices()
{

    $result['status'] = 'ok';
    $result['data'] = queryResult(querySelectBuilder(
        'vk_mini_app_devices',
        '`vk_mini_app_devices`.`id`, `vk_mini_app_devices`.`device`, `vk_mini_app_device_types`.`device_type`',
        [
            ['=', '`vk_mini_app_devices`.`is_actual`', 1],
            ['=', '`vk_mini_app_device_types`.`is_actual`', 1],
        ],
        [],
        null,
        null,
        ['inner', 'vk_mini_app_device_types', 'id' => 'device_type_id']
    ));

    return json_encode($result);
}

function addUserDevice($postData)
{
    if (isset(
        $postData['user_id'],
        $postData['device'],
    )) {
        $userID = $postData['user_id'];
        $device = $postData['device'];
        $execution = true;
    } else {
        $result['status'] = 'error';
        $execution = false;
    }

    if ($execution) {

        $deviceRows = queryResultOne(querySelectBuilder('vk_mini_app_devices', 'id', [
            ['=', 'is_actual', 1],
            ['=', 'device', $device],
        ]));

        if ($deviceRows) {
            $deviceID = $deviceRows['id'];

            queryExec(queryInsertBuilder('vk_mini_app_devices_for_user', [
                'user_id' => $userID,
                'device_id' => $deviceID
            ]));

            $data = [
                'user_id' => $userID,
                'device' => $device,
            ];

            $result = makeCurlRequest($postData['action'], $data);
        } else {
            $result['status'] = 'error';
        }
    }

    return json_encode($result);
}

function removeUserDevice($postData)
{
    if (isset(
        $postData['user_id'],
        $postData['device'],
    )) {
        $userID = $postData['user_id'];
        $device = $postData['device'];
        $execution = true;
    } else {
        $result['status'] = 'error';
        $execution = false;
    }

    if ($execution) {
        $deviceRows = queryResultOne(querySelectBuilder('vk_mini_app_devices', 'id', [
            ['=', 'is_actual', 1],
            ['=', 'device', $device],
        ]));

        if ($deviceRows) {
            $deviceID = $deviceRows['id'];

            queryExec(queryUpdateBuilder('vk_mini_app_devices_for_user', ['is_actual' => 0], [
                'user_id' => $userID,
                'device_id' => $deviceID
            ]));

            $data = [
                'user_id' => $userID,
                'device' => $device,
            ];

            $result = makeCurlRequest($postData['action'], $data);
        } else {
            $result['status'] = 'error';
        }
    }

    return json_encode($result);
}

function createRequestForRepairDevice($postData)
{
    if (isset(
        $postData['user_id'],
        $postData['device'],
        $postData['problem'],
        $postData['problem_description'],
        $postData['adress'],
        $postData['name'],
        $postData['phone']
    )) {
        $userID = $postData['user_id'];
        $device = $postData['device'];
        $problem = $postData['problem'];
        $problemDescription = $postData['problem_description'];
        $adress = $postData['adress'];
        $name = $postData['name'];
        $phone = $postData['phone'];
        $execution = true;
    } else {
        $result['status'] = 'error';
        $execution = false;
    }

    if ($execution) {
        $data = [
            'user_id' => $userID,
            'device' => $device,
            'problem' => $problem,
            'probelm_description' => $problemDescription,
            'adress' => $adress,
            'name' => $name,
            'phone' => $phone,
        ];

        $resultOfInsert = queryExec(queryInsertBuilder('vk_mini_app_repair_requests', $data));

        if ($resultOfInsert) {
            $result = makeCurlRequest($postData['action'], $data);
        } else {
            $result['status'] = 'error';
        }
    }

    return json_encode($result);
}

function getRequestsForRepairDevice($postData)
{
    if (isset($postData['user_id'])) {
        $userID = $postData['user_id'];
        $execution = true;
    } else {
        $result['status'] = 'error';
        $execution = false;
    }

    if ($execution) {
        $result['data'] = queryResult(querySelectBuilder('vk_mini_app_repair_requests', '*', [
            'user_id' => $userID
        ]));
    }

    return json_encode($result);
}

function sendMessageToChat($postData)
{
    if (isset(
        $postData['user_id'],
        $postData['text_message'],
    )) {
        $userID = $postData['user_id'];
        $textMessage = $postData['text_message'];
        $execution = true;
    } else {
        $result['status'] = 'error';
        $execution = false;
    }

    if ($execution) {
        $data = [
            'user_id' => $userID,
            'message' => $textMessage,
            'type_message' => "OUT"
        ];

        $resultForInsert = queryExec(queryInsertBuilder('vk_mini_app_chat_messages', $data));

        if ($resultForInsert) {
            $result = makeCurlRequest($postData['action'], $data);
        } else {
            $result['status'] = 'error';
        }
    }

    return json_encode($result);
}

function getMessagesForUser($postData)
{
    if (isset($postData['user_id'])) {
        $userID = $postData['user_id'];
        $execution = true;
    } else {
        $result['status'] = 'error';
        $execution = false;
    }

    if ($execution) {
        $data = [
            'user_id' => $userID
        ];
        $result['status'] = 'ok';
        $result['data'] = queryResult(querySelectBuilder('vk_mini_app_chat_messages', '`message` as `text`, `type_message` as `type`', $data));
    }

    return json_encode($result);
}

function makeCurlRequest($action, $data)
{
    $myCurl = curl_init();
    curl_setopt_array($myCurl, array(
        CURLOPT_URL            => "https://lumrapideco.ru/api/vkapp/api-repair-vk-app.php?action=$action",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query($data)
    ));
    $response = curl_exec($myCurl);
    curl_close($myCurl);
    return json_decode($response, true);
}
