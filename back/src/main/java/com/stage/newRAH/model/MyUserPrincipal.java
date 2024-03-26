package com.stage.newRAH.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

// @Data
// public class MyUserPrincipal implements UserDetails {

//     private Utilisateur utilisateur;


//     public MyUserPrincipal(Utilisateur utilisateur) {
//         this.utilisateur = utilisateur;
//     }

//     @Override
//     public String getUsername() {
//         return utilisateur.getLogin();
//     }

//     @Override
//     public String getPassword() {
//        return utilisateur.getPassword();
//     }

//     @Override
//     public Collection<? extends GrantedAuthority> getAuthorities() {
//         List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
//         for (Fonctionnalite fonctionnalite: utilisateur.getListFonctionnalites()) {
//             authorities.add(new SimpleGrantedAuthority(fonctionnalite.getLibelle()));
//         }
//         return authorities;
//     }

//     @Override
//     public boolean isAccountNonExpired() {
//         throw new UnsupportedOperationException("Unimplemented method 'isAccountNonExpired'");
//     }


//     @Override
//     public boolean isAccountNonLocked() {
//         throw new UnsupportedOperationException("Unimplemented method 'isAccountNonLocked'");
//     }

//     @Override
//     public boolean isCredentialsNonExpired() {
//         throw new UnsupportedOperationException("Unimplemented method 'isCredentialsNonExpired'");
//     }

//     @Override
//     public boolean isEnabled() {
//         throw new UnsupportedOperationException("Unimplemented method 'isEnabled'");
//     }

// }
