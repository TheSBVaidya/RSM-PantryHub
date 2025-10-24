package com.pantryhub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class PantryHubBackendApplication {

    @Autowired
    private Environment environment;

	public static void main(String[] args) {
		SpringApplication.run(PantryHubBackendApplication.class, args);
	}

    @EventListener(ApplicationReadyEvent.class)
    public void logPortAfterStartup() {
        String port = environment.getProperty("local.server.port");
        System.out.println("🚀 Application running on port: http://localhost:" + port);
    }

}
