package com.ktl.profyBe.card;

import lombok.RequiredArgsConstructor;
import lombok.val;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CardRepo {

    private final MongoTemplate mongoTemplate;

    public Page<Card> getAll(String ownerId, String key, String value, Pageable pageable) {
        Criteria criteria = Criteria.where("ownerId").is(ownerId);
        if (key != null && value != null) {
            criteria.and("infos." + key).regex(value, "i");
        }
        Query query = new Query();
        query.addCriteria(criteria);
        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));
        query.with(pageable);
        List<Card> cards = mongoTemplate.find(query, Card.class);
        long count = mongoTemplate.count(query, Card.class);
        return new PageImpl<>(cards, pageable, count);
    }

    public Optional<Card> findById(String cardId) {

        return Optional.ofNullable(mongoTemplate.findById(cardId, Card.class));
    }

    public Card create(Card card) {
        return mongoTemplate.save(card);
    }

    public Card update(String id, Map<String, String> info) {
        Query query = new Query(Criteria.where("id").is(id));
        Update update = Update.update("infos", info);
        FindAndModifyOptions findAndModifyOptions = new FindAndModifyOptions().returnNew(true);
        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, Card.class);
    }

    public void delete(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        mongoTemplate.remove(query, Card.class);
    }
}
