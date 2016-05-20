/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.talkingshop.controllers;

import com.mycompany.talkingshop.model.User;
import com.mycompany.talkingshop.services.ChatService;
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
@RequestMapping(path = "/login",
        produces = MediaType.APPLICATION_JSON_VALUE)
public class UserRestController {

    private ChatService chatService;

    @Autowired
    public void setChatService(ChatService chatService) {
        this.chatService = chatService;
    }

    @RequestMapping(method = RequestMethod.POST,
            path = "/user",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public User getUser(@RequestBody User user) {
        return chatService.getUser(user);
    }

    @RequestMapping(method = RequestMethod.PUT,
            path = "/user")
    public void logout(@RequestBody User user) {
        chatService.logout(user);
    }

}
