package com.ktl.profyBe.card;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ktl.profyBe.auth.JwtService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/card")
@RequiredArgsConstructor
@Slf4j
public class CardController {

    private final CardService cardService;
    private final JwtService jwtService;

    @GetMapping("")
    public ResponseEntity<List<Card>> getAll(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestParam(name = "fieldName",required = false,defaultValue = "") String fieldName,
            @RequestParam(name = "value",required = false,defaultValue = "") String value,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "36") int pageSize) {

        Pageable pageable = PageRequest.of(page, pageSize);

        String token = authHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);

        if (fieldName.isEmpty()) {
            fieldName = null;
        }
        if(value.isEmpty()){
            value = null;
        }
        return ResponseEntity.ok(cardService.getAllOfUser(username, fieldName, value, pageable));
    }

    @GetMapping("/{cardId}")
    public ResponseEntity<Card> getCard(
            @PathVariable String cardId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestBody Map<String, String> data) {

        String token = authHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);

        return ResponseEntity.ok(cardService.get(cardId, username));
    }

    @PostMapping("")
    public ResponseEntity<Card> createCard(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestBody List<Info> data) {

        String token = authHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);

        return ResponseEntity.ok(cardService.create(username, data));
    }

    @PutMapping("/{cardId}")
    public ResponseEntity<Card> updateCard(
            @PathVariable String cardId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestBody List<Info> data) {

        String token = authHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);

        return ResponseEntity.ok(cardService.update(cardId, username, data));
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity<Void> deleteCard(
            @PathVariable String cardId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);

        cardService.delete(cardId, username);
        return ResponseEntity.ok().build();
    }

}
