package lk.ijse.backend.dto;

import lk.ijse.backend.enums.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDTO {
    private String orderId; // Reference to Order
    private LocalDateTime deliveryDate;
    private DeliveryStatus deliveryStatus; // e.g., "PENDING", "IN_TRANSIT", "DELIVERED"
    private double distance; // in km
}