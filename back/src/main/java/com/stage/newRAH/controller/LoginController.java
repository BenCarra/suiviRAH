/*package com.stage.newRAH.controller;

import java.security.Principal;
import java.util.Base64;

import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

// D'après https://www.baeldung.com/spring-security-login-angular

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    @RequestMapping("/login")
    public boolean login(@RequestBody User user) {
        return user.getUsername().equals("user") && user.getPassword().equals("password");
    }

	  @RequestMapping("/user")
    public Principal user(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization")
          .substring("Basic".length()).trim();
        return () ->  new String(Base64.getDecoder()
          .decode(authToken)).split(":")[0];
    }

}*/
