/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.talkingshop.controllers;

import com.mycompany.talkingshop.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 *
 * @author Sokolov@ivc.org
 */
@Controller
public class MessageController {

    @MessageMapping("/chat")
    @SendTo("/talkingshop/messages")
    public Message sendMessage(Message message) throws Exception {
        return message;
    }

}
