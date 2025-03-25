package lk.ijse.backend.dto;

import lk.ijse.backend.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthDTO {
    private String email;
    private String token;
    private UserRole role;
}