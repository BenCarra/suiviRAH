package com.stage.newRAH;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.stage.newRAH.model.User;
import com.stage.newRAH.repository.UserRepository;

@SpringBootApplication
public class NewRahApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewRahApplication.class, args);	
	}

    // @Bean
    // CommandLineRunner init(UserRepository userRepository) {
    //     return args -> {
    //         Stream.of("John", "Julie", "Jennifer", "Helen", "Rachel").forEach(name -> {
    //             User user = new User(0, name, name.toLowerCase() + "@domain.com");
    //             userRepository.save(user);
    //         });
    //         userRepository.findAll().forEach(System.out::println);
    //     };
    // }

    // @Bean
    // CommandLineRunner init(TacheRepository tacheRepository) {
    // return args -> {

    //     List<String> nomsTaches = new ArrayList<>();
        
    //     // Création de 5 taches 
    //     Tache nouvelleTache1 = new Tache("Nouvelle tâche 1");
    //     Tache nouvelleTache2 = new Tache("Nouvelle tâche 2");
    //     Tache nouvelleTache3 = new Tache("Nouvelle tâche 3");
    //     Tache nouvelleTache4 = new Tache("Nouvelle tâche 4");
    //     Tache nouvelleTache5 = new Tache("Nouvelle tâche 5");

    //     List<Tache> taches = Arrays.asList(nouvelleTache1,nouvelleTache2,nouvelleTache3,nouvelleTache4,nouvelleTache5);

    //     for (Tache tache : taches) {
    //         String nomTache = tache.getNomTache();
    //         nomsTaches.add(nomTache);
    //         tacheRepository.save(tache);
    //     }
        
    //     nomsTaches.forEach(System.out::println);
    // };
}


        // // Récupérer toutes les tâches depuis le tacheRepository
        // Iterable<Tache> taches = tacheRepository.findAll();
        // List<String> nomsTaches = new ArrayList<>();
        // for (Tache tache : taches) {
        //     String nomTache = tache.getNomTache();
        //     nomsTaches.add(nomTache);
        // }
        
        // // Afficher la liste des tâches
        // nomsTaches.forEach(System.out::println);

        // // Créer une nouvelle tâche et l'enregistrer
        // Tache nouvelleTache = new Tache("Nouvelle tâche");
        // tacheRepository.save(nouvelleTache);

        // // Récupérer toutes les tâches après l'ajout de la nouvelle tâche
        // Iterable<Tache> toutesLesTachesApresAjout = tacheRepository.findAll();
        // List<String> nomsTachesApresAjout = new ArrayList<>();
        // for (Tache tache : toutesLesTachesApresAjout) {
        //     String nomTache = tache.getNomTache();
        //     nomsTachesApresAjout.add(nomTache);
        // }

        // // Afficher la liste des tâches après l'ajout de la nouvelle tâche
        // System.out.println("Liste des tâches après l'ajout de la nouvelle tâche :");
        // nomsTachesApresAjout.forEach(System.out::println);



// Problème avec cette méthode car il va chercher la liste des utilisateurs de tache

//     @Bean
//     CommandLineRunner init(TacheRepository tacheRepository) {
//     return args -> {
//         Stream.of("NouvelleTache1", "NouvelleTache2", "NouvelleTache3", "NouvelleTache4", "NouvelleTache5"). forEach(nomTache->
//         {
//             Tache tache = new Tache(nomTache);
//             tacheRepository.save(tache);
//         });
//         tacheRepository.findAll().forEach(System.out::println);
//     };
// }




