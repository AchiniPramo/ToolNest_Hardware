package lk.ijse.backend.dto;

import lk.ijse.backend.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String address;
    private String profilePicture;
    private UserRole role = UserRole.CUSTOMER; // Default role for customers
    private LocalDateTime createdAt;
}