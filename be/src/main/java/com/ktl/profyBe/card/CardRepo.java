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
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Slf4j
public class CardRepo {

    private final MongoTemplate mongoTemplate;

    public Page<Card> getAll(String ownerId, String fieldName, String value, Pageable pageable) {

        Query query;
        if (fieldName != null && value != null) {
            query = new Query(Criteria.where("ownerId").is(ownerId)
                    .and("infos")
                    .elemMatch(Criteria.where("fieldName").is(fieldName)
                            .and("value")
                            .regex(value, "i")));
        }else{
            query = new Query()
                    .addCriteria(Criteria.where("ownerId").is(ownerId));
        }
        log.info(String.valueOf(query));
        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));
        query.with(pageable);
        List<Card> cards = mongoTemplate.find(query, Card.class);
        log.info(String.valueOf(query));
        log.info(cards.toString());
        long count = mongoTemplate.count(query, Card.class);
        log.info(String.valueOf(count));
        return new PageImpl<>(cards, pageable, count);
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
