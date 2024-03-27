package com.stage.newRAH.configuration;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.stage.newRAH.service.CustomUserDetailsService;

// @Config permet à toute application Java de collaborer avec Spring Security dans le frameword Spring
@Configuration
// @Enable informe mon application qu'elle utilisera Spring Security
@EnableWebSecurity
public class SpringSecurityConfig {

    // clé symétrique (256) utilisée pour le chiffrement et le déchiffrement
    // je l'ai générée sur https://www.jmpconcept.fr/generateur-cle-wep.html
    private String jwtKey = "356b7266295f49465a6c2565513726503e687d2f23217a7255703f2872"; 

    @Autowired
    private CustomUserDetailsService customUserDetailsService;  

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            // je désactive le csrf :
            .csrf(csrf -> csrf.disable())
            // je passe en mode stateless :
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> {
                auth.requestMatchers("/utilisateurs").hasAuthority("CREATE_UTILISATEUR");
                auth.requestMatchers("/taches").hasAuthority("CREATE_TACHE");
                auth.requestMatchers(HttpMethod.POST,"/createUtilisateur").hasAuthority("CREATE_UTILISATEUR");
                auth.requestMatchers(HttpMethod.POST, "/createTache").hasAuthority("CREATE_TACHE");
                // je vais demander que toutes les requêtes soient authentifiées :
                auth.anyRequest().authenticated();
                })
            // je rajoute la méthode de securité (mode d'authenfication par défaut de SpringSecurity) : Basic Auth :
            .httpBasic(Customizer.withDefaults())
            .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))
            .build();
    }

    // Cette méthode permet d'indiquer à Spring Security d'utiliser la classe CustomUserDetailsService pour
    // authentifier des utilisateurs
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

    @Bean
    public JwtDecoder jwtDecoder() {
        SecretKeySpec secretKey = new SecretKeySpec(this.jwtKey.getBytes(), 0, this.jwtKey.getBytes().length,"RSA");
        return NimbusJwtDecoder.withSecretKey(secretKey).macAlgorithm(MacAlgorithm.HS256).build();
    }

    @Bean
	public JwtEncoder jwtEncoder() {
		return new NimbusJwtEncoder(new ImmutableSecret<>(this.jwtKey.getBytes()));
	}
}
