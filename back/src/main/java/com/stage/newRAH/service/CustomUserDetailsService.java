package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.FonctionnaliteDTO;
import com.stage.newRAH.model.TypeUtilisateur;
import com.stage.newRAH.model.Utilisateur;
import com.stage.newRAH.repository.UtilisateurRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private FonctionnaliteService fonctionnaliteService;

    // Utilisation de Logger pour vérifier la récupération des autorisations
    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);


    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Utilisateur utilisateur = utilisateurRepository.findByLogin(login);

        List<GrantedAuthority> authorities = getGrantedAuthorities(utilisateur.getTypeUtilisateur());

        logger.info("Autorisations pour l'utilisateur {}: {}", login, authorities);

        return new User(utilisateur.getLogin(), utilisateur.getPassword(),getGrantedAuthorities(utilisateur.getTypeUtilisateur())); 
    }

    private List<GrantedAuthority> getGrantedAuthorities(TypeUtilisateur typeUtilisateur) {

        List<FonctionnaliteDTO> fonctionnalites = fonctionnaliteService.getFonctionnalitesByTypeUtilisateur(typeUtilisateur);
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for (FonctionnaliteDTO fonctionnalite : fonctionnalites) {
            authorities.add(new SimpleGrantedAuthority(fonctionnalite.getLibelle()));
        }
		return authorities;
	}

}
