package com.pantryhub.identityservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

@SpringBootApplication
@EnableDiscoveryClient
public class IdentityServiceApplication {

    @Autowired
    private Environment environment;

    public static void main(String[] args) {
        SpringApplication.run(IdentityServiceApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void logPortAfterStartup() {
        String port = environment.getProperty("local.server.port");
        System.out.println("🚀 Identity-Service Server running on port: http://localhost:" + port);
    }

}
