package com.ktl.profyBe.card;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "cards")
public class Card {

    @Id
    private String id;

    private String ownerId;

    private List<Info> infos;

    private long createdAt;

}
