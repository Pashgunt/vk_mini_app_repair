import axios from "axios";

const getAllDeviceListForUser = async function (userID) {
    const data = {
        'action': 'get_user_devices',
        'secret': '1GipmudsZ2',
        'user_id': userID
    }
    return await axios.post(`/backend/`, JSON.stringify(data))
        .then(response => response.data)
        .catch(error => error);
}

const getDeviceList = async function () {
    const data = {
        'action': 'get_devices',
        'secret': '1GipmudsZ2'
    }
    return await axios.post(`/backend/`, JSON.stringify(data))
        .then(response => response.data)
        .catch(error => error);
}

const addDeviceForUser = async function (userID, device) {
    const data = {
        'action': 'add_user_device',
        'secret': '1GipmudsZ2',
        'user_id': userID,
        'device': device
    }
    return await axios.post(`/backend/`, JSON.stringify(data))
        .then(response => response.data)
        .catch(error => error);
}

const removeDeviceForUser = async function (userID, device) {
    const data = {
        'action': 'delete_user_device',
        'secret': '1GipmudsZ2',
        'user_id': userID,
        'device': device
    }
    return await axios.post(`/backend/`, JSON.stringify(data))
        .then(response => response.data)
        .catch(error => error);
}

const createRequestForRepairDevice = async function (
    device,
    problem,
    problemDescription,
    adress,
    name,
    phone,
    userID
) {
    const data = {
        'action': 'create_repair_request',
        'secret': '1GipmudsZ2',
        'user_id': userID,
        'device': device,
        'problem': problem,
        'problem_description': problemDescription,
        'adress': adress,
        'name': name,
        'phone': phone,
    };
    return await axios.post('/backend/', JSON.stringify(data))
        .then(response => response.data)
        .catch(error => error);
}

const getRequestsForRepairDevice = async function (userID) {
    const data = {
        'action': 'get_repair_request',
        'secret': '1GipmudsZ2',
        'user_id': userID
    };
    return await axios.post(`/backend/`, JSON.stringify(data))
        .then(response => response.data)
        .catch(error => error);;
};

const sendMessageToChat = async function (userID, textMessage, name, phone) {
    let data = {
        'action': 'send_message_chat',
        'secret': '1GipmudsZ2',
        'user_id': userID,
        'text_message': textMessage,
        'name': name,
        'phone': phone
    };
    return await axios.post('/backend/', JSON.stringify(data))
        .then(response => response.data)
        .catch(error => error);
}

const createCrashedTestForUser = async function (userID, typeOfCrashed) {
    let data = {
        'user_id': userID,
        'type_of_crashed': typeOfCrashed,
        'action': 'create_crashed_test_for_user',
        'secret': '1GipmudsZ2',
    }
    return await axios.post('/backend/', JSON.stringify(data))
        .then(response => response.data)
        .catch(error => error);
}

const getCrashedTestsForUser = async function (userID) {
    const data = {
        'action': 'get_crashed_tests_for_user',
        'secret': '1GipmudsZ2',
        'user_id': userID
    };
    return await axios.post(`/backend/`, JSON.stringify(data))
        .then(response => response.data)
        .catch(error => error);;
};

const updateCrashedTestsForUser = async function (userID) {
    const data = {
        'action': 'update_crashed_test_for_user',
        'secret': '1GipmudsZ2',
        'user_id': userID
    };
    return await axios.post(`/backend/`, JSON.stringify(data))
        .then(response => response.data)
        .catch(error => error);;
};

const getMessagesForUser = async function (userID) {
    let data = {
        'action': 'get_messages_for_user',
        'secret': '1GipmudsZ2',
        'user_id': userID
    };
    return await axios.post('/backend/', JSON.stringify(data))
        .then(response => response.data)
        .catch(error => error);
}

export {
    getAllDeviceListForUser,
    getDeviceList,
    addDeviceForUser,
    removeDeviceForUser,
    createRequestForRepairDevice,
    getRequestsForRepairDevice,
    sendMessageToChat,
    getMessagesForUser,
    createCrashedTestForUser,
    getCrashedTestsForUser,
    updateCrashedTestsForUser
}