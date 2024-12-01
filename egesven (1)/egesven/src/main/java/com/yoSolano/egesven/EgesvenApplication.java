package com.yoSolano.egesven;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.yoSolano.egesven.repository")
public class EgesvenApplication {

	public static void main(String[] args) {
		SpringApplication.run(EgesvenApplication.class, args);
	}

}
