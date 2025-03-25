package lk.ijse.backend.controller;

import lk.ijse.backend.dto.AuthDTO;
import lk.ijse.backend.dto.ResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/authenticate")
    public ResponseEntity<ResponseDTO> login(@RequestBody UserDTO userDTO) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            AuthDTO authDTO = authService.login(userDTO.getEmail(), userDTO.getPassword());
            responseDTO.setCode(VarList.OK);
            responseDTO.setMessage("Login successful");
            responseDTO.setData(authDTO);

            // Return the response with HTTP status 200 (OK)
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            responseDTO.setCode(VarList.Internal_Server_Error);
            responseDTO.setMessage("An error occurred: " + e.getMessage());
            responseDTO.setData(null);

            // Return the response with HTTP status 500 (Internal Server Error)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseDTO);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        // Logout the user by blacklisting the token
        authService.logout(token);

        return ResponseEntity.ok("Logged out successfully");
    }
}