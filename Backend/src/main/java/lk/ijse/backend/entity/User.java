package lk.ijse.backend.entity;

import jakarta.persistence.*;
import lk.ijse.backend.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String phoneNumber;
    private String address;
    private String profilePicture;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.CUSTOMER; // Default role for users

    @CreationTimestamp
    private LocalDateTime createdAt;
}