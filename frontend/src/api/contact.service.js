import apiClient from "./api-client.js";

const API = "/contacts";
const contactService = {
    saveContact(contact) {
        return apiClient.post(API, contact);
    }
}

export default contactService;