package com.ktl.profyBe.user;

import com.ktl.profyBe.auth.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

//    @PostMapping("/sign-in")
//    public ResponseEntity<Map<String,String>> signIn(@RequestParam String username, @RequestParam String password) {
//
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(username,password)
//        );
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        UserDetails user = (UserDetails) authentication.getPrincipal();
//        Map<String, String> tokens = new HashMap<>();
//        tokens.put("access_token", jwtService.generateToken(user, true));
//        tokens.put("refresh_token", jwtService.generateToken(user, false));
//        return ResponseEntity.ok(tokens);
//    }
    @PostMapping("/sign-up")
    public ResponseEntity<Void> register(@RequestParam String username, @RequestParam String password) {

        userService.signUp(username, password);

        return ResponseEntity.ok().build();
    }

}
