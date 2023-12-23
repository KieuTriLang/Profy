package com.ktl.profyBe.card;

import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ktl.profyBe.user.User;
import com.ktl.profyBe.user.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepo cardRepo;
    private final UserRepo userRepo;

    public Page<Card> getAllOfUser(String username, String key, String value, Pageable pageable) {
        return cardRepo.getAll(username, key, value, pageable);
    }

    public Card get(String cardId, String username) {
        User user = userRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("Not found user."));
        Card record = cardRepo.findById(cardId).orElseThrow(() -> new RuntimeException("Not found card."));

        if (!user.getId().equals(record.getOwnerId())) {
            throw new RuntimeException("You are not owner.");
        }

        return record;
    }

    public Card create(String username, Map<String, String> data) {

        User user = userRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("Not found user."));
        Card card = Card.builder()
                .id(UUID.randomUUID().toString())
                .ownerId(user.getId())
                .infos(data)
                .build();

        return cardRepo.create(card);
    }

    public Card update(String cardId, String username, Map<String, String> data) {
        User user = userRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("Not found user."));
        Card record = cardRepo.findById(cardId).orElseThrow(() -> new RuntimeException("Not found card."));

        if (!user.getId().equals(record.getOwnerId())) {
            throw new RuntimeException("You are not owner.");
        }
        return cardRepo.update(cardId, data);
    }

    public void delete(String cardId, String username) {
        User user = userRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("Not found user."));
        Card record = cardRepo.findById(cardId).orElseThrow(() -> new RuntimeException("Not found card."));

        if (!user.getId().equals(record.getOwnerId())) {
            throw new RuntimeException("You are not owner.");
        }
        cardRepo.delete(cardId);
    }

}
