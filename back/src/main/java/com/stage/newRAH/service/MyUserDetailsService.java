package com.stage.newRAH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.stage.newRAH.model.Utilisateur;
import com.stage.newRAH.repository.UtilisateurRepository;

// @Service
// public class MyUserDetailsService implements UserDetailsService {
//     @Autowired
//     private UtilisateurRepository utilisateurRepository;

//     @Override
//     public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
//         Utilisateur utilisateur = utilisateurRepository.findByLogin(login);
//         if (utilisateur == null) {
//             throw new UsernameNotFoundException(login);
//         }
//         return new MyUserPrincipal(utilisateur);
//     }

// }
