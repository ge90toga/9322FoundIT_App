package com.seek.api.service;

/**
 * Created by langley on 13/5/17.
 */
public interface MailService {

    void sendMail(String to, String subject, String content);

}
