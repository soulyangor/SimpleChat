/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.talkingshop.services;

import com.mycompany.talkingshop.model.Message;
import com.mycompany.talkingshop.model.User;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sokolov@ivc.org
 */
@Service("chatService")
public class ChatServiceImpl implements ChatService {

    private final List<Message> messages = new ArrayList<>();
    private final List<User> users = new ArrayList<>();

    @Override
    public List<Message> getMessages() {
        return messages;
    }

    @Override
    public List<User> getUsers() {
        return users;
    }

    @Override
    public Message addMessage(Message message) {
        Message msg = new Message(message);
        msg.setDate(new Date());
        messages.add(msg);
        return msg;
    }

    @Override
    public void deleteMessage(Message message) {
        messages.remove(message);
    }

    @Override
    public User getUser(User user) {
        if (!users.contains(user)) {
            users.add(user);
            user.setOnline(true);
            return user;
        } else {
            int index = users.indexOf(user);
            User u = users.get(index).isOnline() ? null : user;
            u.setOnline(true);
            return u;
        }
    }

    @Override
    public void logout(User user) {
        int index = users.indexOf(user);
        if (index >= 0) {
            users.get(index).setOnline(false);
        }
    }

}
