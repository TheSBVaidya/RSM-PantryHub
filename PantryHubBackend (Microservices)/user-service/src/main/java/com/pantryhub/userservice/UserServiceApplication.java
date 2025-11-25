package com.pantryhub.userservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class UserServiceApplication {

    @Autowired
    private Environment environment;

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void logPortAfterStartup() {
        String port = environment.getProperty("local.server.port");
        System.out.println("🚀 User-Service Server running on port: http://localhost:" + port);
    }

}
