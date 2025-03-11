package com.consultpro.app.entity;
import com.consultpro.app.enums.USER_STATUS;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
/**
 * @author : Kanchana Kalansooriya
 * @since 11/10/2024
 */
@Entity
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "COUNSELOR")
public class Counselor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String city;
    private String gender;
    private LocalDate dob;
    @Column(length = 2048)
    private String profilePic;
    private String specialize;
    @Column(length = 2048)
    private String nic;
    private boolean isPsychologist;
    @Column(length = 2048)
    private String degreeTranscript;
    private String medicalQualification;
    private String experienceDescription;
}

