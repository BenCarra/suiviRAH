package com.stage.newRAH;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NewRahApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewRahApplication.class, args);	
	}

	/*@Bean
    CommandLineRunner init(CompositionRepository compositionRepository) {
        return args -> {
            compositionRepository.findAll().forEach(System.out::println);
        };
    }*/

}
