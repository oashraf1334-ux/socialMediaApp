"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailEvent = void 0;
const node_events_1 = require("node:events");
const sendEmail_templet_1 = require("./sendEmail.templet");
const send_email_1 = require("./send.email");
exports.emailEvent = new node_events_1.EventEmitter();
exports.emailEvent.on("confirmEmail", async (data) => {
    try {
        data.subject = "confirm your email";
        data.html = (0, sendEmail_templet_1.confirmEmailTemplet)(data.otp, data.username);
        await (0, send_email_1.sendEmail)(data);
    }
    catch (error) {
        console.log(`fail to send email`, error);
    }
});
