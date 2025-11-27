package com.pantryhub.serviceregistry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

@SpringBootApplication
@EnableEurekaServer
public class ServiceRegistryApplication {

    @Autowired
    private Environment environment;

    public static void main(String[] args) {
        SpringApplication.run(ServiceRegistryApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void logPortAfterStartup() {
        String port = environment.getProperty("local.server.port");
        System.out.println("🚀 Service-Registry Server running on port: http://localhost:" + port);
    }

}
