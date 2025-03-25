package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    private String orderId; // Reference to Order
    private String productId; // Reference to Product
    private int quantity;
    private double price; // Price at the time of purchase
}