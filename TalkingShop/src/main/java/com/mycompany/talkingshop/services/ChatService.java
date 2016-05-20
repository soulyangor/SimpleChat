/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.talkingshop.services;

import com.mycompany.talkingshop.model.Message;
import com.mycompany.talkingshop.model.User;
import java.util.List;

/**
 *
 * @author Sokolov@ivc.org
 */
public interface ChatService {

    List<Message> getMessages();

    List<User> getUsers();

    Message addMessage(Message message);

    void deleteMessage(Message message);

    User getUser(User user);

    void logout(User user);

}
