package com.project.mentor_konnect.model;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.*;


@MappedSuperclass
@Getter
@Setter
public abstract class AbstractPersistable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}