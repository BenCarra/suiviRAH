package com.stage.newRAH.configuration;

import org.springframework.security.access.expression.SecurityExpressionRoot;
import org.springframework.security.access.expression.method.MethodSecurityExpressionOperations;
import org.springframework.security.core.Authentication;
import com.stage.newRAH.model.Utilisateur;

// public class CustomMethodSecurityExpressionRoot extends SecurityExpressionRoot implements MethodSecurityExpressionOperations {

//     public CustomMethodSecurityExpressionRoot(Authentication authentication) {
//         super(authentication);
        
//     }

//     public boolean isTypeUtilisateur(int idTypeUtilisateur) {
//         Utilisateur utilisateur = ((MyUserPrincipal) this.getPrincipal()).getUtilisateur();
//         return utilisateur.getTypeUtilisateur().getIdTypeUtilisateur() == idTypeUtilisateur;
//     }
//     @Override
//     public void setFilterObject(Object filterObject) {
        
//         throw new UnsupportedOperationException("Unimplemented method 'setFilterObject'");
//     }

//     @Override
//     public Object getFilterObject() {
        
//         throw new UnsupportedOperationException("Unimplemented method 'getFilterObject'");
//     }

//     @Override
//     public void setReturnObject(Object returnObject) {
        
//         throw new UnsupportedOperationException("Unimplemented method 'setReturnObject'");
//     }

//     @Override
//     public Object getReturnObject() {
        
//         throw new UnsupportedOperationException("Unimplemented method 'getReturnObject'");
//     }

//     @Override
//     public Object getThis() {
        
//         throw new UnsupportedOperationException("Unimplemented method 'getThis'");
//     }

// }
