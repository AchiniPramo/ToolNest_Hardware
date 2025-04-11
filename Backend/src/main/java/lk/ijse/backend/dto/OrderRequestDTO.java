package lk.ijse.backend.dto;

import lombok.*;

// Order request DTO for capturing order creation parameters
@Setter
@Getter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {
    // Getters and setters
    private AddressDTO shippingAddress;
    private AddressDTO billingAddress;
    private String paymentMethod;

}
