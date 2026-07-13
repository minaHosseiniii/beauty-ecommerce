import contactService from "../api/contact.service.js";

export async function contactAction({request}){
    const formData = await request.formData();

    const mobileNumber = formData.get("mobileNumber");
    const email = formData.get("email");

    const contact = {
        name : formData.get("name"),
        email: email,
        mobileNumber: mobileNumber,
        message: formData.get("message")
    };

    if (!email && !mobileNumber) {
        return {
            success: false,
            message: "Please enter either an email or mobile number."
        };
    }

    try {
        await contactService.saveContact(contact);

        return{
            success: true,
            message: "Your message has been sent successfully."
        };
    }catch (e) {
        return {
            success: false,
            message: "Sending message failed. "
        };
    }
}