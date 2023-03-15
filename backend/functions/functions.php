<?php

function getUserDevices($postData)
{
    if (isset($postData['user_id'])) {
        $userID = $postData['user_id'];
        $execution = true;
    } else {
        $result = "error";
        $execution = false;
    }

    if ($execution) {
        $data = [
            'user_id' => $userID
        ];
        $result = makeCurlRequest($postData['action'], $data);
    }

    return json_encode($result);
}

function getDevices($postData)
{
    $result = makeCurlRequest($postData['action'], []);

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
        $result = "error";
        $execution = false;
    }

    if ($execution) {
        $data = [
            'user_id' => $userID,
            'device' => $device,
        ];
        $result = makeCurlRequest($postData['action'], $data);
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
        $result = "error";
        $execution = false;
    }

    if ($execution) {
        $data = [
            'user_id' => $userID,
            'device' => $device,
        ];
        $result = makeCurlRequest($postData['action'], $data);
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
        $result = "error";
        $execution = false;
    }

    if ($execution) {
        $data = [
            'user_id' => $userID,
            'device' => $device,
            'problem' => $problem,
            'problemDescription' => $problemDescription,
            'adress' => $adress,
            'name' => $name,
            'phone' => $phone,
        ];
        $result = makeCurlRequest($postData['action'], $data);
    }

    return json_encode($result);
}

function getRequestsForRepairDevice($postData)
{
    if (isset($postData['user_id'])) {
        $userID = $postData['user_id'];
        $execution = true;
    } else {
        $result = "error";
        $execution = false;
    }

    if ($execution) {
        $data = [
            'user_id' => $userID
        ];
        $result = makeCurlRequest($postData['action'], $data);
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
        $result = "error";
        $execution = false;
    }

    if ($execution) {
        $data = [
            'user_id' => $userID,
            'text_message' => $textMessage,
        ];
        $result = makeCurlRequest($postData['action'], $data);
    }
    
    return json_encode($result);
}

function getMessagesForUser($postData)
{
    if (isset($postData['user_id'])) {
        $userID = $postData['user_id'];
        $execution = true;
    } else {
        $result = "error";
        $execution = false;
    }

    if ($execution) {
        $data = [
            'user_id' => $userID
        ];
        $result = makeCurlRequest($postData['action'], $data);
    }

    return json_encode($result);
}

function makeCurlRequest($action, $data)
{
    $myCurl = curl_init();
    curl_setopt_array($myCurl, array(
        CURLOPT_URL            => "https://lumrapideco.ru/api/api-repair-vk?action=$action",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query($data)
    ));
    $response = curl_exec($myCurl);
    curl_close($myCurl);
    return json_decode($response, true);
}
