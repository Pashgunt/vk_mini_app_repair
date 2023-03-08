import axios from "axios";

const getAllDeviceListForUser = async function (userID) {
    return await axios.get(`https://sca-tech.ru/erp-22251/react_app_api/v1/get_user_devices/?key=1GipmudsZ2&user_id=${userID}`)
        .then(promise => promise.data)
}

const getDeviceList = async function () {
    return await axios.get(`https://sca-tech.ru/erp-22251/react_app_api/v1/get_devices/?key=1GipmudsZ2`)
        .then(promise => promise.data); 
}

const addDeviceForUser = async function (userID, device) {
    const data = { 'user_id': userID, 'device': device }
    return await axios.post(`https://sca-tech.ru/erp-22251/react_app_api/v1/add_user_device/?key=1GipmudsZ2`, JSON.stringify(data))
        .then(response => response)
        .catch(error => error);
}

const removeDeviceForUser = async function (userID, device) {
    const data = { 'user_id': userID, 'device': device }
    return await axios.post(`https://sca-tech.ru/erp-22251/react_app_api/v1/delete_user_device/?key=1GipmudsZ2`, JSON.stringify(data))
        .then(response => response)
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
        'device': device,
        'problem': problem,
        'problem_description': problemDescription,
        'adress': adress,
        'name': name,
        'phone': phone,
        'user_id': userID,
    };
    return await axios.post('https://sca-tech.ru/erp-22251/react_app_api/v1/create_repair_request/?key=1GipmudsZ2', JSON.stringify(data))
        .then(response => response)
        .catch(error => error);
}

const getRequestsForRepairDevice = async function (userID) {
    return await axios.get(`https://sca-tech.ru/erp-22251/react_app_api/v1/get_repair_request/?key=1GipmudsZ2&user_id=${userID}`)
        .then(promise => promise.data);
};

const sendMessageToChat = async function (userID, textMessage) {
    let data = {
        'user_id': userID,
        'text_message': textMessage
    };
    return await axios.post('https://sca-tech.ru/erp-22251/react_app_api/v1/send_message_chat/?key=1GipmudsZ2', JSON.stringify(data))
        .then(response => response)
        .catch(error => error);
}

const getMessagesForChatUser = async function (userID) {
    return await axios.get(`https://sca-tech.ru/erp-22251/react_app_api/v1/get_repair_request/?key=1GipmudsZ2&user_id=${userID}`)
        .then(promise => promise.data);
}

const getMessagesForUser = async function (userID) {
    return await axios.get(`https://sca-tech.ru/erp-22251/react_app_api/v1/get_messages_for_user/?key=1GipmudsZ2&user_id=${userID}`)
        .then(promise => promise.data);
}

export {
    getAllDeviceListForUser,
    getDeviceList,
    addDeviceForUser,
    removeDeviceForUser,
    createRequestForRepairDevice,
    getRequestsForRepairDevice,
    sendMessageToChat,
    getMessagesForChatUser,
    getMessagesForUser
}