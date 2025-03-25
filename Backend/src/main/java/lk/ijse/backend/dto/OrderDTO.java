package lk.ijse.backend.dto;

import lk.ijse.backend.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private String userId; // Reference to User
    private LocalDateTime orderDate;
    private double totalAmount;
    private String deliveryAddress;
    private double deliveryCharge;
    private OrderStatus status; // e.g., "PENDING", "SHIPPED", "DELIVERED"
    private List<OrderItemDTO> orderItems; // List of order items
    private PaymentDTO payment; // Payment details
    private DeliveryDTO delivery; // Delivery details
}