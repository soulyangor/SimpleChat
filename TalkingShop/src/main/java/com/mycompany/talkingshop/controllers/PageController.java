package com.mycompany.talkingshop.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
      
    @RequestMapping("/")
    public String getStartPage() {
        return "login";
    }
    
    @RequestMapping("/login")
    public String getLoginPage() {
        return "login";
    }
    
    @RequestMapping("/chat")
    public String getChatPage() {
        return "chat";
    }

}
