/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.talkingshop.app;

import com.mycompany.talkingshop.services.ChatServiceImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author Sokolov@ivc.org
 */
@SpringBootApplication
@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackages = "com.mycompany")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
