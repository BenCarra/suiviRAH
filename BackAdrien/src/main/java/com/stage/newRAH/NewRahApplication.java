package com.stage.newRAH;

//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;

//import com.stage.newRAH.repository.UtilisateurRepository;

@SpringBootApplication
public class NewRahApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewRahApplication.class, args);	
	}

	/*@Bean
    CommandLineRunner init(UtilisateurRepository utilisateurRepository) {
        return args -> {
            utilisateurRepository.findAll().forEach(System.out::println);
        };
    }*/

}
