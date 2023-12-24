package com.ktl.profyBe.card;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class CardRepo {

    private final MongoTemplate mongoTemplate;

    public List<Card> getAll(String ownerId, String fieldName, String value, Pageable pageable) {
        // TODO error: Cannot find with query
//        if (fieldName != null && value != null) {
//
//            Query query = new Query()
//                    .addCriteria(Criteria.where("ownerId").is(ownerId)
//                            .and("infos")
//                            .elemMatch(Criteria.where(fieldName)
//                                    .regex(value, "i")))
//                    .with(Sort.by(Sort.Direction.DESC, "createdAt"))
//                    .with(pageable);
//            List<Card> cards = mongoTemplate.find(query, Card.class);
//            long count = mongoTemplate.count(query, Card.class);
//            return new PageImpl<>(cards, pageable, count);
//        }else{
//            Query query = new Query()
//                    .addCriteria(Criteria.where("ownerId").is(ownerId))
//                    .with(Sort.by(Sort.Direction.DESC, "createdAt"))
//                    .with(pageable);
//            List<Card> cards = mongoTemplate.find(query, Card.class);
//            long count = mongoTemplate.count(query, Card.class);
//            return new PageImpl<>(cards, pageable, count);
//        }

        return mongoTemplate.find(new Query(Criteria.where("ownerId").is(ownerId)), Card.class);
    }

    public Optional<Card> findById(String cardId) {

        return Optional.ofNullable(mongoTemplate.findById(cardId, Card.class));
    }

    public Card create(Card card) {
        return mongoTemplate.save(card);
    }

    public Card update(String id, List<Info> info) {
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
