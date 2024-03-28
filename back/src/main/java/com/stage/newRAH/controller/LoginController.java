package com.stage.newRAH.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.service.JWTService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    private JWTService jwtService;

	public LoginController(JWTService jwtService) {
		this.jwtService = jwtService;
	}

	@PostMapping("/login")
	public String getToken(Authentication authentication) {
		System.out.println("Informations d'authentification : " + authentication);
		
		String token = jwtService.generateToken(authentication);
		System.out.println("token " + token);
		return token;
	}

}
