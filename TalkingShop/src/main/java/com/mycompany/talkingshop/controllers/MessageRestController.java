/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.talkingshop.controllers;

import com.mycompany.talkingshop.model.Message;
import com.mycompany.talkingshop.services.ChatService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sokolov@ivc.org
 */
@RestController
@RequestMapping(path = "/messages",
        produces = MediaType.APPLICATION_JSON_VALUE)
public class MessageRestController {

    private ChatService chatService;

    @Autowired
    public void setChatService(ChatService chatService) {
        this.chatService = chatService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Message> getMessages() {
        return chatService.getMessages();
    }

    @RequestMapping(method = RequestMethod.POST,
            path = "/item",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public Message createMessage(@RequestBody Message message) {
        return chatService.addMessage(message);
    }

    @RequestMapping(method = RequestMethod.DELETE,
            path = "/item",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void deleteMessage(@RequestBody Message message) {
        chatService.deleteMessage(message);
    }

}
