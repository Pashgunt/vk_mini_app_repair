<?php
require_once __DIR__ . "/../db/query_functions.php";

function getUserDevices($postData)
{
    if (isset($postData['action'])) {
        $userID = 161450796;
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

        $prepareDevices = [];

        $devices = queryResult(
            "SELECT `devices`.`device`, `device_type`.`device_type` FROM `vk_mini_app_devices_for_user` as `user_devices`
                INNER JOIN `vk_mini_app_devices` as `devices` 
                ON `user_devices`.`device_id` = `devices`.`id`
                INNER JOIN `vk_mini_app_device_types` as `device_type`
                ON `devices`.`device_type_id` = `device_type`.`id`
                WHERE `user_devices`.`is_actual` = 1 AND `user_devices`.`user_id` = $userID"
        );

        foreach ($devices as $element) {
            $prepareDevices[$element['device_type']][] = $element['device'];
        }

        $result['data'] = $prepareDevices;
    }

    return json_encode($result);
}

function getDevices()
{

    $result['status'] = 'ok';

    $prepareDevices = [];

    $devices = queryResult(querySelectBuilder(
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

    foreach ($devices as $element) {
        $prepareDevices[$element['device_type']][] = $element['device'];
    }

    $result['data'] = $prepareDevices;

    return json_encode($result);
}

function addUserDevice($postData)
{
    if (isset(
        $postData['device'],
    )) {
        $userID = 161450796;
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
            $result['data'] = 'success';
            // $result = makeCurlRequest($postData['action'], $data);
        } else {
            $result['status'] = 'error';
        }
    }

    return json_encode($result);
}

function removeUserDevice($postData)
{
    if (isset(
        $postData['device'],
    )) {
        $userID = 161450796;
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

            // $result = makeCurlRequest($postData['action'], $data);
            $result['data'] = 'success';
        } else {
            $result['status'] = 'error';
        }
    }

    return json_encode($result);
}

function createRequestForRepairDevice($postData)
{
    if (isset(
        // $postData['user_id'],
        $postData['device'],
        $postData['problem'],
        $postData['problem_description'],
        $postData['adress'],
        $postData['name'],
        $postData['phone']
    )) {
        $userID = 161450796;
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
            $result['data'] = 'success';
            // $result = makeCurlRequest($postData['action'], $data);
        } else {
            $result['status'] = 'error';
        }
    }

    return json_encode($result);
}

function getRequestsForRepairDevice($postData)
{
    if (isset($postData['action'])) {
        // $userID = $postData['user_id'];
        $execution = true;
    } else {
        $result['status'] = 'error';
        $execution = false;
    }

    if ($execution) {

        $prepareData = [
            'current' => [],
            'all' => [],
        ];

        $data = queryResult(querySelectBuilder('vk_mini_app_repair_requests', '*', [
            'user_id' => 161450796
        ]));

        foreach ($data as $repair) {
            $prepareData['all'][] = $repair;
            if ($repair['is_actual']) {
                $prepareData['current'][] = $repair;
            }
        }

        $result['data'] = $prepareData;
    }

    return json_encode($result);
}

function sendMessageToChat($postData)
{
    if (isset(
        // $postData['user_id'],
        $postData['text_message'],
    )) {
        $userID = 161450796;
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
            $result['data'] = 'success';
            // $result = makeCurlRequest($postData['action'], $data);
        } else {
            $result['status'] = 'error';
        }
    }

    return json_encode($result);
}

function getMessagesForUser($postData)
{
    if (isset($postData['action'])) {
        $userID = 161450796;
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

function getCrashedTestsForUser($postData)
{
    if (isset($postData['action'])) {
        $userID = 161450796;
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
        $resultOfQuery = queryResult(querySelectBuilder('vk_mini_app_crashed_tests', '*', $data));

        $result['data'] = [
            $userID => array_column($resultOfQuery, 'type_of_crashed')
        ];
    }

    return json_encode($result);
}

function createCrashedTestForUser($postData)
{
    if (isset(
        // $postData['user_id'],
        $postData['type_of_crashed'],
    )) {
        $userID = 161450796;
        $typeOfCrashed = $postData['type_of_crashed'];
        $execution = true;
    } else {
        $result['status'] = 'error';
        $execution = false;
    }

    if ($execution) {
        $data = [
            'user_id' => $userID,
            'type_of_crashed' => $typeOfCrashed
        ];

        $resultOfInsert = queryExec(queryInsertBuilder('vk_mini_app_crashed_tests', $data));

        if ($resultOfInsert) {
            $result['data'] = 'success';
        } else {
            $result['status'] = 'error';
        }
    }

    return json_encode($result);
}

function makeCurlRequest($action, $data)
{
    $myCurl = curl_init();
    curl_setopt_array($myCurl, array(
        CURLOPT_URL            => "url",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query($data)
    ));
    $response = curl_exec($myCurl);
    curl_close($myCurl);
    return json_decode($response, true);
}

function makeCurlRequestForCreateLead($data)
{
    $myCurl = curl_init();
    curl_setopt_array($myCurl, array(
        CURLOPT_URL            => "url",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query($data)
    ));
    $response = curl_exec($myCurl);
    curl_close($myCurl);
    return json_decode($response, true);
}
