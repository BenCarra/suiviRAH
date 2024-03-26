package com.stage.newRAH.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.stage.newRAH.service.CustomUserDetailsService;


@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;  

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> {
            auth.requestMatchers("/utilisateurs").hasAuthority("CREATE_UTILISATEUR");
            auth.requestMatchers(HttpMethod.POST,"/createUtilisateur").hasAuthority("CREATE_UTILISATEUR");
            auth.requestMatchers(HttpMethod.POST, "/createTache").hasAuthority("CREATE_TACHE");
            auth.anyRequest().authenticated();
        }).formLogin(Customizer.withDefaults()).build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
    authenticationManagerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(bCryptPasswordEncoder);
	return authenticationManagerBuilder.build();
    }

    // Je rajoute un encodeur
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



//     // clé symétrique utilisée pour le chiffrement et le déchiffrement
//     private String jwtKey = "laclegeneree256…."; 

//     // Chaine de filtre de sécurité
//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         return http
//         .csrf(csrf -> csrf.disable() ) // je désactive le csrf
//         .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // je passe en mode Stateless
//         .authorizeHttpRequests(auth -> auth.anyRequest().authenticated()) // je vais demander que toutes les requêtes soient authentifiées
//         .httpBasic(Customizer.withDefaults()) // je rajoute la méthode de securité (mode d'authenfication par défaut de SpringSecurity)
//         .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))
//         .build(); 
//     }

//     // Je rajoute un encodeur
//     @Bean
//     public BCryptPasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     // Je crée des utilisateurs en mémoire pour vérifier ma configuration de sécurité
//     @Bean
//     public UserDetailsService users() {
//         UserDetails user = User.builder().username("user").password(passwordEncoder().encode("password")).roles("USER").build();
//         return new InMemoryUserDetailsManager(user);
//     }

    
//     @Bean
//     public JwtDecoder jwtDecoder() {
//         SecretKeySpec secretKey = new SecretKeySpec(this.jwtKey.getBytes(), 0, this.jwtKey.getBytes().length,"RSA");
//         return NimbusJwtDecoder.withSecretKey(secretKey).macAlgorithm(MacAlgorithm.HS256).build();
//     }


}
