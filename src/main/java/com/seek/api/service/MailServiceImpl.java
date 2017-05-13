package com.seek.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Created by langley on 13/5/17.
 */
@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender sender;

    @Value("${spring.mail.username}")
    private String from;

    @Override
    public void sendMail(String to, String subject, String content) {
        new Thread(new SendEmailRunnable(to, subject, content)).start();
    }

    private class SendEmailRunnable implements Runnable{
        private String to;
        private String subject;
        private String content;

        SendEmailRunnable(String to, String subject, String content){
            this.to = to;
            this.subject = subject;
            this.content = content;
        }

        @Override
        public void run() {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(from);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(content);

            try {
                sender.send(message);
                System.out.println("success send: " + to);   // TODO invalid email address send success.
            } catch (Exception e) {
                System.out.println("fail send:" + to + " | error code: " + e);
            }
        }
    }

}
