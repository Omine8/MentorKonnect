package com.project.mentor_konnect.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "timetable")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Timetable {

    @Id
    private Long id;  // shared PK with Mentor

    @OneToOne
    @MapsId
    @JoinColumn(name = "id", referencedColumnName = "id")
    private Mentor mentor;

    @Lob
    @JdbcTypeCode(SqlTypes.BINARY)   // 👈 Force Hibernate to bind as binary/bytea
    @Column(name = "image_data", nullable = false)
    private byte[] imageData;

    @Column(name = "content_type", nullable = false)
    private String contentType;
}
